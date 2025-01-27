import ThreadBox from "@/components/custom/thread-box";
import ThreadDelete from "@/components/custom/thread-delete";
import ThreadForm from "@/components/custom/thread-form";
import ThreadSkele from "@/components/custom/thread-skele";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { open } from "@/global/state/dialog/dialog-slice";
import { useThread } from "@/hooks/thread-hook";
import { Post } from "@/types/thread";
import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { LuImage } from "react-icons/lu";
import { GetThreads } from "../tanstack/thread-tanstack";

export default function Home() {
  const [threads, setThreads] = useState<Post[]>();
  const { isFetching: isPendingGetThread } = GetThreads(setThreads);
  const { handle, interaction, load, state } = useThread();

  return (
    <>
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
          borderBottom="1px solid #212121"
          justifyContent="space-between"
          onClick={() => state.dispatch(open(true))}
        >
          <Box display="flex" alignItems="center" gap="1rem">
            <Avatar src={state.loggedUser?.Profile?.file} />
            <Text color="gray">What is happening!?</Text>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem">
            <LuImage size="1.5rem" color="gray" />
            <Button
              disabled
              backgroundColor="white"
              color="black"
              borderRadius="1rem"
              height="2rem"
            >
              Post
            </Button>
          </Box>
        </Box>
        {isPendingGetThread && <ThreadSkele />}
        {!isPendingGetThread &&
          threads
            ?.map((thread: Post) => (
              <ThreadBox
                key={thread.id}
                thread={thread}
                handleLike={handle.handleLike}
                handleUnLike={handle.handleUnLike}
                setThreadId={state.setThreadId}
                reset={state.reset}
                setPreview={state.setPreview}
              />
            ))
            .reverse()}
      </Box>
      <ThreadForm
        state={state}
        load={load}
        interaction={interaction}
        handle={handle}
        threadId={null}
      />
      <ThreadDelete state={state} load={load} handle={handle} />
      <Toaster />
    </>
  );
}
