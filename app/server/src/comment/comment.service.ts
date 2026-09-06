import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { normalizeAssetUrl } from '../common/asset-url';

const DEFAULT_CATEGORY = '综合讨论';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    page = 1,
    pageSize = 10,
    sort = 'latest',
    includeDeleted = false,
    category?: string,
  ) {
    const normalizedPage = Math.max(1, page);
    const normalizedPageSize = Math.min(Math.max(1, pageSize), 50);
    const skip = (normalizedPage - 1) * normalizedPageSize;
    const where = {
      ...(includeDeleted ? {} : { deletedAt: null }),
      ...(category ? { category } : {}),
    };
    const normalizedSort = sort === 'top' ? 'top' : 'latest';
    const orderBy: Prisma.CommentOrderByWithRelationInput | Prisma.CommentOrderByWithRelationInput[] =
      normalizedSort === 'top'
        ? [{ isPinned: 'desc' }, { isFeatured: 'desc' }, { likes: { _count: 'desc' } }, { createdAt: 'desc' }]
        : [{ isPinned: 'desc' }, { isFeatured: 'desc' }, { createdAt: 'desc' }];

    const [comments, total] = await Promise.all([
      this.prisma.comment.findMany({
        skip,
        take: normalizedPageSize,
        where: {
          ...where,
          parentId: null,
        },
        include: this.buildCommentInclude(includeDeleted),
        orderBy,
      }),
      this.prisma.comment.count({ where: { ...where, parentId: null } }),
    ]);

    return {
      data: comments.map(comment => this.formatComment(comment)),
      meta: {
        total,
        page: normalizedPage,
        pageSize: normalizedPageSize,
        totalPages: Math.ceil(total / normalizedPageSize),
        sort: normalizedSort,
        category: category || 'all',
      },
    };
  }

  async create(createCommentDto: CreateCommentDto, userId: number, userRole?: string) {
    const isAdmin = this.isAdmin(userRole);
    const normalizedTitle = createCommentDto.parentId ? null : createCommentDto.title?.trim();
    const normalizedCategory = createCommentDto.parentId
      ? null
      : (createCommentDto.category?.trim() || DEFAULT_CATEGORY);
    const normalizedTags = createCommentDto.parentId
      ? []
      : this.normalizeTags(createCommentDto.tags);

    if (createCommentDto.quoteId) {
      await this.assertCommentExists(createCommentDto.quoteId);
    }
    const comment = await this.prisma.comment.create({
      data: {
        title: normalizedTitle,
        category: normalizedCategory,
        tags: normalizedTags.length > 0 ? normalizedTags.join(',') : null,
        content: createCommentDto.content.trim(),
        parentId: createCommentDto.parentId,
        quoteId: createCommentDto.quoteId,
        isPinned: createCommentDto.parentId ? false : (isAdmin && Boolean(createCommentDto.isPinned)),
        isFeatured: createCommentDto.parentId ? false : (isAdmin && Boolean(createCommentDto.isFeatured)),
        userId,
      },
      include: this.buildCommentInclude(false),
    });

    return {
      data: this.formatComment(comment),
    };
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
    userId: number,
    userRole?: string,
  ) {
    const existingComment = await this.assertCanManage(id, userId, userRole);
    const data: Prisma.CommentUpdateInput = {};
    const isAdmin = this.isAdmin(userRole);

    if (typeof updateCommentDto.content === 'string') {
      data.content = updateCommentDto.content.trim();
    }
    if (existingComment.parentId === null) {
      if (typeof updateCommentDto.title === 'string') {
        data.title = updateCommentDto.title.trim();
      }
      if (typeof updateCommentDto.category === 'string') {
        data.category = updateCommentDto.category.trim() || DEFAULT_CATEGORY;
      }
      if (Array.isArray(updateCommentDto.tags)) {
        const normalizedTags = this.normalizeTags(updateCommentDto.tags);
        data.tags = normalizedTags.length > 0 ? normalizedTags.join(',') : null;
      }
      if (isAdmin && typeof updateCommentDto.isPinned === 'boolean') {
        data.isPinned = updateCommentDto.isPinned;
      }
      if (isAdmin && typeof updateCommentDto.isFeatured === 'boolean') {
        data.isFeatured = updateCommentDto.isFeatured;
      }
    }

    const comment = await this.prisma.comment.update({
      where: { id },
      data,
      include: this.buildCommentInclude(false),
    });

    return {
      data: this.formatComment(comment),
    };
  }

  async remove(id: number, userId: number, userRole?: string) {
    await this.assertCanManage(id, userId, userRole);
    await this.softDeleteTree(id);

    return {
      data: { id },
    };
  }

  async findOne(id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: this.buildCommentInclude(false),
    });

    if (!comment || comment.deletedAt) {
      throw new NotFoundException('评论不存在或已删除');
    }

    const withSubReplies = await this.attachSubReplies(comment);

    return {
      data: this.formatComment(withSubReplies),
    };
  }

  // 楼中楼：不限深度地把一级楼层下的所有后代平铺到各自楼层，并给每条附上回复对象作者。
  private async attachSubReplies(comment: any) {
    const replies = Array.isArray(comment.replies) ? comment.replies : [];
    if (replies.length === 0) {
      return { ...comment, replies: [] };
    }

    const rootIds = replies.map((reply: any) => reply.id);
    const byRoot: Record<number, any[]> = {};
    const parentRootMap = new Map<number, number>();
    for (const rootId of rootIds) {
      byRoot[rootId] = [];
      parentRootMap.set(rootId, rootId);
    }

    let frontier = [...rootIds];
    while (frontier.length > 0) {
      const batch = await this.prisma.comment.findMany({
        where: { parentId: { in: frontier }, deletedAt: null },
        include: {
          user: {
            select: {
              userId: true,
              username: true,
              avatar: true,
              role: true,
              badge: true,
              score: true,
            },
          },
          likes: {
            select: { id: true, commentId: true, userId: true, createdAt: true },
          },
          quote: {
            select: {
              id: true,
              content: true,
              userId: true,
              user: { select: { username: true, avatar: true } },
            },
          },
          parent: {
            select: {
              id: true,
              user: { select: { username: true } },
            },
          },
          _count: {
            select: { likes: true, replies: { where: { deletedAt: null } } },
          },
        },
        orderBy: { createdAt: 'asc' },
      });

      if (batch.length === 0) {
        break;
      }

      const nextFrontier: number[] = [];
      for (const child of batch) {
        const parentId = child.parentId as number;
        const rootId = parentRootMap.get(parentId);
        const parentUser = child.parent?.user?.username ?? null;
        delete (child as any).parent;
        (child as any).parentUser = parentUser;

        if (rootId !== undefined && byRoot[rootId]) {
          byRoot[rootId].push(child);
          parentRootMap.set(child.id, rootId);
          nextFrontier.push(child.id);
        }
      }
      frontier = nextFrontier;
    }

    for (const rootId of Object.keys(byRoot)) {
      byRoot[rootId].sort((a: any, b: any) => {
        const timeDiff =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        return timeDiff !== 0 ? timeDiff : a.id - b.id;
      });
    }

    const newReplies = replies.map((reply: any) => ({
      ...reply,
      subReplies: byRoot[reply.id] || [],
    }));

    return { ...comment, replies: newReplies };
  }

  async toggleLike(commentId: number, userId: number) {
    await this.assertCommentExists(commentId);
    const already = await this.prisma.commentLike.findUnique({
      where: { commentId_userId: { commentId, userId } },
    });
    if (already) {
      await this.prisma.commentLike.delete({
        where: { commentId_userId: { commentId, userId } },
      });
      return { liked: false };
    }

    await this.prisma.commentLike.create({
      data: { commentId, userId },
    });
    return { liked: true };
  }

  private buildReplyInclude(): Prisma.CommentInclude {
    return {
      user: {
        select: {
          userId: true,
          username: true,
          avatar: true,
          role: true,
          badge: true,
          score: true,
        },
      },
      likes: {
        select: {
          id: true,
          commentId: true,
          userId: true,
          createdAt: true,
        },
      },
      quote: {
        select: {
          id: true,
          content: true,
          userId: true,
          user: {
            select: {
              username: true,
              avatar: true,
            },
          },
        },
      },
      _count: {
        select: {
          likes: true,
          replies: { where: { deletedAt: null } },
        },
      },
    };
  }

  private buildCommentInclude(includeDeleted: boolean): Prisma.CommentInclude {
    return {
      ...this.buildReplyInclude(),
      replies: {
        where: includeDeleted ? {} : { deletedAt: null },
        include: this.buildReplyInclude(),
        orderBy: { createdAt: 'asc' },
      },
    };
  }

  private formatComment(comment: any): any {
    const replies = Array.isArray(comment.replies)
      ? comment.replies.map((reply: any) => this.formatComment(reply))
      : [];

    const subReplies = Array.isArray(comment.subReplies)
      ? comment.subReplies.map((reply: any) => this.formatComment(reply))
      : [];

    return {
      ...comment,
      user: comment.user
        ? {
            ...comment.user,
            avatar: normalizeAssetUrl(comment.user.avatar),
          }
        : comment.user,
      quote: comment.quote
        ? {
            ...comment.quote,
            user: comment.quote.user
              ? {
                  ...comment.quote.user,
                  avatar: normalizeAssetUrl(comment.quote.user.avatar),
                }
              : comment.quote.user,
          }
        : comment.quote,
      isDeleted: Boolean(comment.deletedAt),
      likeCount: comment._count?.likes ?? comment.likes?.length ?? 0,
      replyCount: Array.isArray(comment.subReplies)
        ? subReplies.length
        : (comment._count?.replies ?? (replies.length + subReplies.length)),
      category: comment.category || DEFAULT_CATEGORY,
      tags: this.parseTags(comment.tags),
      isPinned: Boolean(comment.isPinned),
      isFeatured: Boolean(comment.isFeatured),
      replies,
      subReplies,
    };
  }

  private async assertCanManage(id: number, userId: number, userRole?: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      select: {
        id: true,
        userId: true,
        parentId: true,
        deletedAt: true,
      },
    });

    if (!comment || comment.deletedAt) {
      throw new NotFoundException('评论不存在或已删除');
    }

    const isAdmin = typeof userRole === 'string' && userRole.toUpperCase() === 'ADMIN';
    const isAuthor = comment.userId === userId;
    if (!isAdmin && !isAuthor) {
      throw new ForbiddenException('无权操作该评论');
    }

    return comment;
  }

  private normalizeTags(tags?: string[]) {
    if (!Array.isArray(tags)) {
      return [];
    }

    return [...new Set(
      tags
        .map(tag => tag.trim())
        .filter(Boolean)
        .slice(0, 5),
    )];
  }

  private parseTags(tags?: string | null) {
    if (!tags) {
      return [];
    }

    return tags
      .split(',')
      .map(tag => tag.trim())
      .filter(Boolean);
  }

  private isAdmin(userRole?: string) {
    return typeof userRole === 'string' && userRole.toUpperCase() === 'ADMIN';
  }

  private async assertCommentExists(id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      select: { id: true, deletedAt: true },
    });
    if (!comment || comment.deletedAt) {
      throw new NotFoundException('引用的评论不存在或已删除');
    }
  }

  private async softDeleteTree(rootId: number) {
    let frontier = [rootId];
    while (frontier.length > 0) {
      await this.prisma.comment.updateMany({
        where: { id: { in: frontier } },
        data: { deletedAt: new Date() },
      });
      const children = await this.prisma.comment.findMany({
        where: { parentId: { in: frontier }, deletedAt: null },
        select: { id: true },
      });
      frontier = children.map((child) => child.id);
    }
  }
}
