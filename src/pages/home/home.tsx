import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SkeletonCircle, SkeletonText } from "@/components/ui/skeleton";
import { GetThreads } from "@/tanstack/tanstack";
import { Post } from "@/types/thread";
import { Box, HStack, Image, Text } from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import { LuImage } from "react-icons/lu";

export default function Home() {
  const [threads, setThreads] = useState<Post[]>();
  const { isFetching } = GetThreads(setThreads);

  return (
    <Box width="100%">
      <Box padding="1rem">
        <Text as="h1" fontWeight="semibold" color="white" fontSize="1.2rem">
          Home
        </Text>
      </Box>
      <Box
        display="flex"
        cursor="pointer"
        padding="0.5rem 1.5rem 1.5rem 1.5rem"
        alignItems="center"
        gap="1rem"
        borderBottom="1px solid #e6e6e6"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center" gap="1rem">
          <Avatar />
          <Text color="gray">What is happening!?</Text>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <LuImage size="1.5rem" color="gray" />
          <Button
            disabled
            backgroundColor="purple"
            borderRadius="1rem"
            height="2rem"
          >
            Post
          </Button>
        </Box>
      </Box>
      {isFetching && (
        // <Box
        //   display="flex"
        //   alignItems="center"
        //   justifyContent="center"
        //   height="100vh"
        // >
        //   <Spinner color="white" size="xl" />
        // </Box>
        <Box padding="1.3rem">
          <Box display="flex" alignItems="center" gap="1rem">
            <SkeletonCircle size="10" />
            <SkeletonText noOfLines={1} />
          </Box>
          <SkeletonText noOfLines={3} marginLeft="3.5rem" />
        </Box>
      )}
      {!isFetching &&
        threads
          ?.map((thread: Post) => (
            <Box
              key={thread.id}
              display="flex"
              color="white"
              borderBottom="1px solid #e6e6e6"
              gap="1rem"
              padding="1.3rem"
            >
              <Avatar />
              <Box display="flex" flexDirection="column" gap="0.1rem">
                <Box display="flex" gap="0.5rem">
                  <Text fontSize="0.9rem" fontWeight="semibold">
                    {thread.author.name}
                  </Text>
                  <Text color="gray" fontWeight="light" fontSize="0.8rem">
                    @{thread.author.username}
                  </Text>
                  <Text color="gray" fontWeight="light" fontSize="0.8rem">
                    &#9679;{" "}
                    {moment(thread.createdAt).startOf("minutes").fromNow()}
                  </Text>
                </Box>
                <Box display="flex" flexDirection="column" gap="0.5rem">
                  <Text fontSize="0.9rem">{thread.content}</Text>
                  {thread.file && (
                    <Image src={thread.file} borderRadius="1rem" />
                  )}
                </Box>
              </Box>
            </Box>
          ))
          .reverse()}
    </Box>
  );
}
