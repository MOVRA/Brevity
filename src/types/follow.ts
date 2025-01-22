export type UserProfile = {
  bio: string;
  file: string;
  user: {
    id: string;
  };
};

export type FollowerDetails = {
  id: string;
  username: string;
  name: string;
  Profile: UserProfile;
  followeByYou: boolean; 
};

export type FollowingDetails = {
  id: string;
  username: string;
  name: string;
  Profile: UserProfile;
  followedByYou: boolean; 
};

export type FollowRelation = {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
  updatedAt: string;
  follower: FollowerDetails;
  following: FollowingDetails;
};

export type User = {
  id: string;
  name: string;
  username: string;
  Follower: FollowRelation[];
  Following: FollowRelation[]; 
};
