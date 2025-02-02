import { follow, followUser, unfollowUser } from "@/api/follow";
import { User } from "@/types/follow";
import { useMutation, useQuery } from "@tanstack/react-query";

export const GetFollow = (
  id: string | undefined,
  setFollow: (a: User) => void
) => {
  return useQuery({
    queryKey: ["FOLLOW"],
    queryFn: async () => {
      const response = await follow(id);
      setFollow(response.data);
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
};

export const CreateFollow = () => {
  return useMutation({
    mutationKey: ["CREATEFOLLOW"],
    mutationFn: async (id: string | undefined) => {
      const response = await followUser(id);
      return response.data;
    },
  });
};

export const DeleteFollow = () => {
  return useMutation({
    mutationKey: ["DELETEFOLLOW"],
    mutationFn: async (id: string | undefined) => {
      const response = await unfollowUser(id);
      return response.data;
    },
  });
};
