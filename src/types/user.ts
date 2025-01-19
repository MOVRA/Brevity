import { Post } from "./thread";

type Profile =
  | {
      bio: string;
      createdAt: string;
      file: string;
      id: string;
      updatedAt: string;
      userId: string;
    }
  | undefined;

export type User =
  | {
      Profile: Profile;
      Thread: Post[];
      createdAt: string;
      email: string;
      followedByYou: boolean;
      followerCount: number;
      followingCount: number;
      id: string;
      name: string;
      updatedAt: string;
      username: string;
    }
  | undefined;
