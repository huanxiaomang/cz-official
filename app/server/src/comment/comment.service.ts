import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

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
    const comment = await this.prisma.comment.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return {
      data: comment,
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

    return {
      data: this.formatComment(comment),
    };
  }

  async toggleLike(commentId: number, userId: number) {
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

  private buildCommentInclude(includeDeleted: boolean): Prisma.CommentInclude {
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
          replies: true,
        },
      },
      replies: {
        where: includeDeleted ? {} : { deletedAt: null },
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
            select: {
              id: true,
              commentId: true,
              userId: true,
              createdAt: true,
            },
          },
          _count: {
            select: {
              likes: true,
              replies: true,
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
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    };
  }

  private formatComment(comment: any): any {
    const replies = Array.isArray(comment.replies)
      ? comment.replies.map((reply: any) => this.formatComment(reply))
      : [];

    return {
      ...comment,
      isDeleted: Boolean(comment.deletedAt),
      likeCount: comment._count?.likes ?? comment.likes?.length ?? 0,
      replyCount: comment._count?.replies ?? replies.length,
      category: comment.category || DEFAULT_CATEGORY,
      tags: this.parseTags(comment.tags),
      isPinned: Boolean(comment.isPinned),
      isFeatured: Boolean(comment.isFeatured),
      replies,
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
}
