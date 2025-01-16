// src/types/Post.ts
export interface Profile {
  name: string;
  username: string;
  file: string;
}

export interface Post {
  id: string;
  content: string;
  author: Profile;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  replyCount: number;
  parentId: string | null;
  parent: Post | null;
  bookmarkedByUser: boolean;
  likedByUser: boolean;
  file: string | null;
}
