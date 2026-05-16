import { defineStore } from "pinia";
import { saveComment, getComments, deleteComment, updateComment, toggleLike } from '~/api/commentApi';
import type { CreateCommentDTO, MainComment, PaginationMeta } from "~/types/comment";
import { useUserStore } from '~/store/user';
import type { UserInfo } from '#/data';

function isUserInfo(obj: any): obj is UserInfo {
  return obj && typeof obj === 'object' && 'userId' in obj && obj.userId !== undefined && obj.userId !== null;
}

// saveComment: 提交新评论到后端
// getComments: 从后端获取评论列表
export const useCommentStore = defineStore('comments', {
  state: () => ({
    comments: [] as MainComment[],
    isLoading: false,
    error: null as string | null,
    meta: {
      total: 0,
      page: 1,
      pageSize: 10,
      totalPages: 0,
      sort: 'latest',
    } as PaginationMeta,
  }),
  actions: {
    async loadComments(params?: {
      page?: number;
      pageSize?: number;
      sort?: 'latest' | 'top';
      category?: string;
    }) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await getComments({
          include_deleted: false,
          page: params?.page ?? this.meta.page,
          pageSize: params?.pageSize ?? this.meta.pageSize,
          sort: params?.sort ?? this.meta.sort ?? 'latest',
          category: params?.category ?? (this.meta.category && this.meta.category !== 'all' ? this.meta.category : undefined),
        });
        const { result, meta } = response;
        this.comments = Array.isArray(result) ? result : [];
        this.meta = {
          total: meta?.total ?? 0,
          page: meta?.page ?? 1,
          pageSize: meta?.pageSize ?? 10,
          totalPages: meta?.totalPages ?? 0,
          sort: (meta?.sort as 'latest' | 'top') ?? params?.sort ?? this.meta.sort ?? 'latest',
          category: meta?.category ?? params?.category ?? this.meta.category ?? 'all',
        };
      } catch (error) {
        this.error = '加载评论失败';
        this.comments = [];
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async submitComment(
      payload: CreateCommentDTO,
    ) {
      if (!payload.content.trim()) return;

      const userStore = useUserStore();
      const userInfo = userStore.getUserInfo;
      if (!isUserInfo(userInfo)) {
        this.error = '请先登录';
        throw new Error('未登录');
      }

      this.isLoading = true;
      this.error = null;
      try {
        const commentData: CreateCommentDTO = {
          ...payload,
          title: payload.parent_id ? undefined : payload.title?.trim(),
          category: payload.parent_id ? undefined : payload.category?.trim(),
          tags: payload.parent_id ? undefined : payload.tags,
          content: payload.content.trim(),
        };
        const newComment = await saveComment(commentData);
        if (commentData.parent_id) {
          return newComment;
        }
        await this.loadComments({ page: 1 });
        return newComment;
      } catch (error) {
        this.error = '提交评论失败';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteComment(commentId: number) {
      this.error = null;
      try {
        await deleteComment(commentId);
        const nextPage = this.comments.length === 1 && this.meta.page > 1
          ? this.meta.page - 1
          : this.meta.page;
        await this.loadComments({ page: nextPage });
      } catch (error) {
        this.error = '删除评论失败';
        throw error;
      }
    },

    async updateComment(comment: Partial<MainComment> & { id: number }) {
      this.error = null;
      try {
        await updateComment(comment.id, {
          title: comment.title,
          content: comment.content,
          isPinned: comment.isPinned,
          isFeatured: comment.isFeatured,
          category: comment.category,
          tags: comment.tags,
        });
        await this.loadComments({ page: this.meta.page });
      } catch (error) {
        this.error = '更新评论失败';
        throw error;
      }
    },

    async likeComment(commentId: number) {
      this.error = null;
      const userStore = useUserStore();
      const userInfo = userStore.getUserInfo;
      if (!isUserInfo(userInfo)) {
        this.error = '请先登录';
        throw new Error('未登录');
      }
      try {
        await toggleLike(commentId);
        await this.loadComments({ page: this.meta.page });
      } catch (error) {
        this.error = '点赞失败';
        throw error;
      }
    },

    clearError() {
      this.error = null;
    },
    async changePage(page: number) {
      await this.loadComments({ page });
    },

    async changeSort(sort: 'latest' | 'top') {
      await this.loadComments({ page: 1, sort });
    },

    async changeCategory(category: string) {
      await this.loadComments({ page: 1, category });
    },
  }
})
