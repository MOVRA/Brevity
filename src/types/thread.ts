export interface Post {
  id: string;
  content: string;
  author: {
    username: string;
    name: string;
    Profile: {
      file: string;
    };
  };
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
