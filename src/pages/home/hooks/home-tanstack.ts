import { threads } from "@/api/thread";
import { Post } from "@/types/thread";
import { useQuery } from "@tanstack/react-query";

export const GetThreads = (setThreads: (a: Post[]) => void) => {
  return useQuery({
    queryKey: ["THREADS"],
    queryFn: async () => {
      const response = await threads();
      setThreads(response.data);
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
};
