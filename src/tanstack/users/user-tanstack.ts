import { users } from "@/api/user";
import { Users } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export const GetUsers = (setUsers: (a: Users[]) => void) => {
  return useQuery({
    queryKey: ["USERS"],
    queryFn: async () => {
      const response = await users();
      setUsers(response.data);
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
};
