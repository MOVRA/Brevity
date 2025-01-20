import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from "@/components/ui/dialog";
import { SkeletonCircle, SkeletonText } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/toaster";
import { open } from "@/global/state/dialog/dialog-slice";
import { AppDispatch, RootState } from "@/global/state/store";
import { Post } from "@/types/thread";
import { ThreadSchema, ThreadTypes } from "@/validator/thread";
import { Box, Image, Input, Text, Textarea } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { LuImage, LuX } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import HomeThread from "./components/home-thread";
import {
  CreateLike,
  CreateThreads,
  DeleteLike,
  DeleteThread,
  GetThreads,
} from "./hooks/home-tanstack";
import { openDelete } from "@/global/state/dialog/delete-dialog.slice";

export default function Home() {
  const [threads, setThreads] = useState<Post[]>();
  const [threadId, setThreadId] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { register, setValue, handleSubmit, reset } = useForm<ThreadTypes>({
    defaultValues: {
      content: "",
      file: null,
    },
    resolver: zodResolver(ThreadSchema),
  });
  const loggedUser = useSelector((state: RootState) => state.loggedUser.value);
  const dialog = useSelector((state: RootState) => state.dialog.value);
  const deleteDialog = useSelector(
    (state: RootState) => state.deleteDialog.value
  );
  const dispatch = useDispatch<AppDispatch>();
  const { isFetching } = GetThreads(setThreads);
  const { mutateAsync: mutateCreateThread, isPending: isPendingCreateThread } =
    CreateThreads();
  const { mutateAsync: mutateCreateLike } = CreateLike();
  const { mutateAsync: mutateDeleteLike } = DeleteLike();
  const { mutateAsync: mutateDeleteThread, isPending: isPendingDeleteThread } =
    DeleteThread();
  const skele = 5;

  function onChangeInputFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setValue("file", file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }

  function onClickInputFile() {
    inputFileRef.current?.click();
  }

  function onCloseDialog() {
    setPreview(null);
    reset();
    dispatch(open(false));
  }

  async function handleSubmitThread(data: ThreadTypes) {
    const response = await mutateCreateThread(data);
    if (response.success) {
      setPreview(null);
      reset();
    }
    return;
  }
  function handleDeleteThread(threadId: string) {
    mutateDeleteThread(threadId);
    return;
  }
  function handleLike(threadId: string) {
    mutateCreateLike(threadId);
    return;
  }
  function handleUnLike(threadId: string) {
    mutateDeleteLike(threadId);
    return;
  }

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
              <HomeThread
                key={thread.id}
                thread={thread}
                handleLike={handleLike}
                handleUnLike={handleUnLike}
                setThreadId={setThreadId}
              />
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
          <form onSubmit={handleSubmit(handleSubmitThread)}>
            <DialogBody
              marginTop="1rem"
              display="flex"
              flexDirection="column"
              gap="1rem"
              padding="0rem 1rem"
            >
              <Box
                display="flex"
                gap="0.5rem"
                borderBottom="1px solid #212121"
                padding="1rem 0rem 0rem 0.5rem"
              >
                <Avatar src={loggedUser?.Profile?.file} />
                <Textarea
                  {...register("content")}
                  color="white"
                  border="none"
                  placeholder="What is happening!?"
                  fontSize="1rem"
                  rows={4}
                  resize="none"
                  focusRingColor="transparent"
                />
              </Box>
            </DialogBody>
            <DialogFooter
              padding="1rem 1.5rem 1rem 1.5rem"
              display="flex"
              flexDirection="column"
              gap="2rem"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                alignItems="center"
              >
                <Input
                  type="file"
                  ref={inputFileRef}
                  hidden
                  onChange={onChangeInputFile}
                />
                <LuImage
                  size="1.5rem"
                  color="gray"
                  onClick={onClickInputFile}
                  cursor="pointer"
                />
                <Button
                  type="submit"
                  backgroundColor="white"
                  color="black"
                  borderRadius="1rem"
                  height="2rem"
                  loading={isPendingCreateThread}
                >
                  Post
                </Button>
              </Box>
              {preview && (
                <Box position="relative">
                  <LuX
                    color="white"
                    style={{ position: "absolute", left: "95%", top: "1rem" }}
                    onClick={() => setPreview(null)}
                    cursor="pointer"
                  />
                  <Image src={preview} borderRadius="1rem" />
                </Box>
              )}
            </DialogFooter>
            <DialogCloseTrigger onClick={onCloseDialog} />
          </form>
        </DialogContent>
      </DialogRoot>
      <DialogRoot open={deleteDialog} size="lg">
        <DialogContent
          backgroundColor="black"
          border="1px solid #212121"
          color="white"
        >
          <DialogHeader>Are you sure?</DialogHeader>
          <DialogBody>
            Are you sure want to delete this thread? this action cannot be
            resolve.
          </DialogBody>
          <DialogFooter>
            <Button
              onClick={() => handleDeleteThread(threadId)}
              loading={isPendingDeleteThread}
              backgroundColor="transparent"
              border="1px solid red"
              color="red"
              borderRadius="1rem"
              height="2rem"
            >
              Delete
            </Button>
            <Button
              backgroundColor="transparent"
              border="1px solid white"
              color="white"
              borderRadius="1rem"
              height="2rem"
              onClick={() => {
                dispatch(openDelete(false));
                setThreadId("");
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
      <Toaster />
    </>
  );
}
