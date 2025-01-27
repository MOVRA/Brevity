import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ThreadBox from "@/components/custom/thread-box";
import ThreadDelete from "@/components/custom/thread-delete";
import ThreadForm from "@/components/custom/thread-form";
import { open } from "@/global/state/dialog/dialog-slice";
import { useThread } from "@/hooks/thread-hook";
import { GetThreadById } from "@/tanstack/thread-tanstack";
import { Post, UseThread } from "@/types/thread";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { LuImage } from "react-icons/lu";
import { useNavigate, useParams } from "react-router";

export default function Reply() {
  const [thread, setThread] = useState<Post>();
  const params = useParams();
  const navigate = useNavigate();
  const { isFetching: isPendingGetThread } = GetThreadById(
    setThread,
    params.threadId
  );
  const { handle, interaction, load, state }: UseThread = useThread();

  return (
    <Box width="100%">
      <Box
        padding="1rem"
        display="flex"
        alignItems="center"
        gap="0.8rem"
        cursor="pointer"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft color="White" />
        <Text as="h1" fontWeight="semibold" color="white" fontSize="1.2rem">
          Status
        </Text>
      </Box>
      {isPendingGetThread && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Spinner size="xl" color="white" />
        </Box>
      )}
      {!isPendingGetThread && thread ? (
        <>
          <ThreadBox
            thread={thread}
            handleLike={handle.handleLike}
            handleUnLike={handle.handleUnLike}
            setThreadId={state.setThreadId}
            reset={state.reset}
            setPreview={state.setPreview}
          />
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
              <Text color="gray">Type your reply!?</Text>
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
        </>
      ) : null}
      {!isPendingGetThread &&
        thread?.replies
          .map((replies) => (
            <ThreadBox
              key={replies.id}
              thread={replies}
              handleLike={handle.handleLike}
              handleUnLike={handle.handleUnLike}
              setThreadId={state.setThreadId}
              reset={state.reset}
              setPreview={state.setPreview}
            />
          ))
          .reverse()}
      <ThreadForm
        threadId={params.threadId}
        load={load}
        interaction={interaction}
        state={state}
        handle={handle}
      />
      <ThreadDelete load={load} state={state} handle={handle} />
    </Box>
  );
}
