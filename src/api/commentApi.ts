import type { CreateCommentDTO, MainComment, PaginatedCommentResult } from '~/types/comment';
import { defHttp } from '~/utils/http';
export interface CommentListParams {
  include_deleted?: boolean;
  page?: number;
  pageSize?: number;
  sort?: 'latest' | 'top';
  category?: string;
}

export const getComments = async (
  params?: CommentListParams,
): Promise<PaginatedCommentResult> => {
  return defHttp.get({
    url: '/comments',
    params,
  });
};

export const getCommentById = async (commentId: number): Promise<MainComment> => {
  return defHttp.get({
    url: `/comments/${commentId}`,
  });
};

export const saveComment = async (commentData: CreateCommentDTO) => {
  const requestData = {
    title: commentData.title,
    category: commentData.category,
    tags: commentData.tags,
    content: commentData.content,
    parentId: commentData.parent_id || null,
    quoteId: commentData.quote_id || null,
    isPinned: commentData.isPinned,
    isFeatured: commentData.isFeatured,
  };

  return defHttp.post({
    url: '/comments',
    data: requestData,
  });
};

export const deleteComment = async (commentId: number) => {
  return defHttp.delete({
    url: `/comments/${commentId}`,
  });
};

export const updateComment = async (
  commentId: number,
  updatedData: Partial<MainComment>
) => {
  return defHttp.patch({
    url: `/comments/${commentId}`,
    data: updatedData,
  });
};

export const toggleLike = async (commentId: number) => {
  return defHttp.post({
    url: `/comments/${commentId}/like`,
  });
};

export const getCommentDetail = async (commentId: number) => {
  return defHttp.get({
    url: `/comments/${commentId}`,
  });
};
