export type Profile = {
  id: string;
  bio: string;
  file: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type FollowingOrFollower = {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  name: string;
  username: string;
  Profile: Profile;
  Following: FollowingOrFollower[];
  Follower: FollowingOrFollower[];
};
