// 评论相关类型定义
export interface CreateCommentDTO {
  title?: string;
  category?: string;
  tags?: string[];
  content: string;
  parent_id?: number;
  quote_id?: number;
  isPinned?: boolean;
  isFeatured?: boolean;
}

export interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  sort?: 'latest' | 'top';
  category?: string;
}

export interface PaginatedCommentResult {
  result: MainComment[];
  meta: PaginationMeta;
}

export interface Comment {
  id: number;
  title?: string | null;
  category?: string | null;
  tags?: string[];
  content: string;
  userId: number;
  parentId?: number;
  quoteId?: number | null;
  createdAt: string;
  isDeleted: boolean;
  isPinned?: boolean;
  isFeatured?: boolean;
  likeCount: number;
  replyCount: number;
  attachmentCount: number;
  user: {
    userId: number;
    username: string;
    avatar?: string;
    role?: string;
    badge?: string;
    score?: number;
  };
  quote?: {
    id: number;
    content: string;
    userId: number;
    user?: {
      username: string;
      avatar?: string;
    };
  };
  replies?: Comment[];
  likes?: CommentLike[];
  attachments?: CommentAttachment[];
}

export interface CommentLike {
  id: number;
  commentId: number;
  userId: number;
  createdAt: string;
}

export interface CommentAttachment {
  id: number;
  commentId: number;
  fileName: string;
  filePath: string;
  fileType: string;
  createdAt: string;
}

// 用于API响应的评论类型
export type MainComment = Comment;

// 用户类型定义（补充）
export interface User {
  userId: number;
  username: string;
  avatar?: string;
  role?: string;
}
