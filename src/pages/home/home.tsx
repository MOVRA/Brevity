import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogRoot,
} from "@/components/ui/dialog";
import { SkeletonCircle, SkeletonText } from "@/components/ui/skeleton";
import { open } from "@/global/dialog/dialog-slice";
import { AppDispatch, RootState } from "@/global/store";
import { Post } from "@/types/thread";
import { Box, Image, Text, Textarea } from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import { LuImage } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { GetThreads } from "./hooks/home-tanstack";

export default function Home() {
  const [threads, setThreads] = useState<Post[]>();
  const loggedUser = useSelector((state: RootState) => state.loggedUser.value);
  const dialog = useSelector((state: RootState) => state.dialog.value);
  const dispatch = useDispatch<AppDispatch>();
  const { isFetching } = GetThreads(setThreads);
  const skele = 5;

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
          onClick={() => dispatch(open(true))}
        >
          <Box display="flex" alignItems="center" gap="1rem">
            <Avatar src={loggedUser?.Profile?.file} />
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
        {isFetching &&
          Array.from({ length: skele }).map((_, index) => (
            <Box padding="1.3rem" key={index} borderBottom="1px solid #212121">
              <Box display="flex" gap="1rem">
                <SkeletonCircle size="10" />
                <Box display="flex" alignItems="center" marginBottom="1rem">
                  <SkeletonText noOfLines={1} width="5rem" />
                  <SkeletonText noOfLines={1} width="5rem" />
                  <SkeletonText noOfLines={1} width="5rem" />
                </Box>
              </Box>
              <SkeletonText noOfLines={3} marginLeft="3.5rem" />
            </Box>
          ))}
        {!isFetching &&
          threads
            ?.map((thread: Post) => (
              <Box
                key={thread.id}
                display="flex"
                color="white"
                borderTop="1px solid #212121"
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
      <DialogRoot
        open={dialog}
        placement="top"
        motionPreset="slide-in-bottom"
        size="lg"
      >
        <DialogContent backgroundColor="black" border="1px solid #212121">
          <DialogBody
            marginTop="1rem"
            display="flex"
            flexDirection="column"
            gap="1rem"
            padding="0rem 1rem"
          >
            <form>
              <Box
                display="flex"
                gap="0.5rem"
                borderBottom="1px solid #212121"
                padding="1rem 0rem 0rem 0.5rem"
              >
                <Avatar src={loggedUser?.Profile?.file} />
                <Textarea
                  color="white"
                  border="none"
                  placeholder="What is happening!?"
                  fontSize="1rem"
                  rows={4}
                  resize="none"
                  focusRingColor="transparent"
                />
              </Box>
            </form>
          </DialogBody>
          <DialogFooter padding="1rem 1.5rem 1rem 1.5rem">
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              alignItems="center"
            >
              <LuImage size="1.5rem" color="gray" />
              <Button
                type="submit"
                backgroundColor="white"
                color="black"
                borderRadius="1rem"
                height="2rem"
              >
                Post
              </Button>
            </Box>
          </DialogFooter>
          <DialogCloseTrigger onClick={() => dispatch(open(false))} />
        </DialogContent>
      </DialogRoot>
    </>
  );
}
