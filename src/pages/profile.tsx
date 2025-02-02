import { threadByUserId } from "@/api/thread";
import { updateUserById, updateUserProfileById, userById } from "@/api/user";
import bgBanner from "@/assets/pngtree-abstract-backgrouns-set-grunge-texture-minimalistic-art-brush-strokes-style-design-image_739359.jpg";
import ThreadBox from "@/components/custom/thread-box";
import ThreadDelete from "@/components/custom/thread-delete";
import ThreadForm from "@/components/custom/thread-form";
import ThreadSkele from "@/components/custom/thread-skele";
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
import { Field } from "@/components/ui/field";
import { Skeleton, SkeletonCircle } from "@/components/ui/skeleton";
import { toaster, Toaster } from "@/components/ui/toaster";
import { RootState } from "@/global/state/store";
import { useThread } from "@/hooks/thread-hook";
import { CreateFollow, DeleteFollow } from "@/tanstack/follow-tanstack";
import { Post } from "@/types/thread";
import { User } from "@/types/user";
import { userSchema, UserType } from "@/validator/user";
import { Box, Image, Input, Stack, Text, Textarea } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

export default function Profile() {
  const params = useParams();
  const [follow, setFollow] = useState<boolean>(false);
  const { mutateAsync: mutateCreateFollow, isPending: isPendingCreateFollow } =
    CreateFollow();
  const { mutateAsync: mutateDeleteFollow, isPending: isPendingDeleteFollow } =
    DeleteFollow();
  const inputFile = useRef<HTMLInputElement>(null);
  const [users, setUsers] = useState<User>();
  const [preview, setPreview] = useState<string | undefined | null>(null);
  const user = useSelector((state: RootState) => state.loggedUser.value);
  const [isPendingGetThreadByUserId, setIsPendingGetThreadByUserId] =
    useState<boolean>(true);
  const [isPendingUpdateUser, setIsPendingUpdateUser] =
    useState<boolean>(false);
  const [isPendingGetUser, setIsPendingGetUser] = useState<boolean>(true);
  const [thread, setThread] = useState<Post[]>();
  const navigate = useNavigate();
  const { handle, interaction, load, state } = useThread();
  const [editDialog, setEditDialog] = useState<boolean>(false);
  const [update, setUpdate] = useState(false);
  const { register, reset, handleSubmit, setValue } = useForm<UserType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      username: "",
      file: null,
      bio: "",
    },
  });

  function updateFile() {
    inputFile.current?.click();
  }

  function onChangeInputFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setValue("file", file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }

  async function handleUpdate(data: UserType) {
    try {
      setIsPendingUpdateUser(true);
      const updateUserProfile = await updateUserProfileById(users?.id, data);
      const updateUser = await updateUserById(user?.id, data);
      if (updateUserProfile.success && updateUser.success) {
        toaster.success({
          title: "Success updating user profile",
        });
        setUpdate(!update);
      }
    } catch (error) {
      toaster.error({
        title: (error as AxiosError).response?.data.message,
      });
    } finally {
      setPreview(null);
      setEditDialog(false);
      setIsPendingUpdateUser(false);
    }
  }

  useEffect(() => {
    async function GetProfileData() {
      try {
        setIsPendingGetThreadByUserId(true);
        setIsPendingGetUser(true);
        if (params.userId) {
          const userData = await userById(params.userId);
          setUsers(userData.data);
          const threadData = await threadByUserId(params.userId);
          setThread(threadData.data);
          setFollow(userData.data.followedByYou);
          reset(userData.data);
          return;
        }
        const userData = await userById(user?.id);
        setUsers(userData.data);
        reset({
          name: userData.data.name,
          username: userData.data.username,
          bio: userData.data.Profile.bio,
          file: userData.data.Profile.file,
        });
        const threadData = await threadByUserId(user?.id);
        setThread(threadData.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsPendingGetThreadByUserId(false);
        setIsPendingGetUser(false);
      }
    }
    GetProfileData();
  }, [params, user, update]);

  async function handleFollow(id: string | undefined) {
    await mutateCreateFollow(id);
    setFollow(true);
  }

  async function handleUnFollow(id: string | undefined) {
    await mutateDeleteFollow(id);
    setFollow(false);
  }

  return (
    <Box width="100%">
      <Box padding="1rem" cursor="pointer" onClick={() => navigate("/")}>
        {isPendingGetUser && (
          <Skeleton width="15%" display="flex" alignItems="center" height="6" />
        )}
        {!isPendingGetUser && (
          <Box display="flex" gap="0.8rem" alignItems="center">
            <FaArrowLeft color="White" />
            <Text as="h1" fontWeight="semibold" color="white" fontSize="1.2rem">
              {users?.name}
            </Text>
          </Box>
        )}
      </Box>
      <Box display="flex" flexDirection="column">
        {isPendingGetUser && (
          <Box display="flex" padding="1rem 1rem 0rem 1rem">
            <Stack width="full">
              <Skeleton height="10rem" borderRadius="1rem" />
              <SkeletonCircle
                variant="shine"
                size="4rem"
                position="absolute"
                top="13rem"
                left="15rem"
              />
            </Stack>
          </Box>
        )}
        {!isPendingGetUser && (
          <Box display="flex" padding="1rem 1rem 0rem 1rem">
            <>
              <Image
                src={bgBanner}
                height="10rem"
                width="100%"
                borderRadius="1rem"
                position="relative"
              />
              <Avatar
                src={users?.Profile?.file}
                size="2xl"
                position="absolute"
                top="13rem"
                left="15rem"
              />
            </>
          </Box>
        )}
        <Box
          display="flex"
          marginTop="1rem"
          gap="1rem"
          justifyContent="space-between"
          borderBottom="1px solid #212121"
        >
          <Box
            margin="2rem 1rem 1rem 1rem"
            display="flex"
            flexDirection="column"
            gap="0.8rem"
          >
            <Skeleton height="6" loading={isPendingGetUser} width="10rem">
              <Text
                as="h1"
                color="white"
                fontWeight="semibold"
                fontSize="1.2rem"
              >
                {users?.name}
              </Text>
            </Skeleton>
            <Skeleton height="4" loading={isPendingGetUser} width="10rem">
              <Text color="gray" fontWeight="light" fontSize="0.8rem">
                @{users?.username}
              </Text>
            </Skeleton>
            <Skeleton height="4" loading={isPendingGetUser} width="20rem">
              <Text color="white" fontSize="0.8rem">
                {users?.Profile?.bio}
              </Text>
            </Skeleton>
            <Box display="flex" gap="0.8rem">
              <Skeleton height="4" loading={isPendingGetUser} width="5rem">
                <Text
                  color="gray"
                  fontSize="0.8rem"
                  display="flex"
                  gap="0.4rem"
                >
                  <span style={{ color: "white" }}>{users?.followerCount}</span>
                  Follower
                </Text>
              </Skeleton>
              <Skeleton height="4" loading={isPendingGetUser} width="5rem">
                <Text
                  color="gray"
                  fontSize="0.8rem"
                  display="flex"
                  gap="0.4rem"
                >
                  <span style={{ color: "white" }}>
                    {users?.followingCount}
                  </span>
                  Following
                </Text>
              </Skeleton>
            </Box>
          </Box>
          <Box marginRight="1rem">
            <Skeleton
              display="flex"
              justifyContent="center"
              width="5rem"
              height="2rem"
              loading={isPendingGetUser}
            >
              <Button
                backgroundColor="transparent"
                border="1px solid white"
                color="white"
                borderRadius="2rem"
                height="2rem"
                loading={follow ? isPendingDeleteFollow : isPendingCreateFollow}
                onClick={() =>
                  users?.id != user?.id
                    ? follow
                      ? handleUnFollow(users?.id)
                      : handleFollow(users?.id)
                    : setEditDialog(true)
                }
              >
                {users?.id != user?.id
                  ? follow
                    ? "Followed"
                    : "Follow"
                  : "Edit"}
              </Button>
            </Skeleton>
          </Box>
        </Box>
        <Box>
          {isPendingGetThreadByUserId && <ThreadSkele />}
          {!isPendingGetThreadByUserId &&
            thread?.map((thread: Post) => (
              <ThreadBox
                key={thread.id}
                thread={thread}
                handleLike={handle.handleLike}
                handleUnLike={handle.handleUnLike}
                setThreadId={state.setThreadId}
                reset={state.reset}
                setPreview={state.setPreview}
              />
            ))}
        </Box>
      </Box>
      <DialogRoot open={editDialog} size="lg">
        <DialogContent backgroundColor="black" border="1px solid #212121">
          <DialogHeader>
            <Text as="h1" fontWeight="semibold" color="white">
              Edit Profile
            </Text>
          </DialogHeader>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <DialogBody>
              <Image
                src={bgBanner}
                height="8rem"
                width="100%"
                borderRadius="1rem"
                position="relative"
              />
              <Avatar
                src={preview ? preview : users?.Profile?.file}
                size="2xl"
                position="absolute"
                top="10rem"
                left="3.5rem"
                onClick={updateFile}
              />
              <Input
                type="file"
                hidden
                ref={inputFile}
                onChange={(e) => onChangeInputFile(e)}
              />
              <Box
                color="white"
                padding="3rem 0rem 0rem 0rem"
                display="flex"
                flexDirection="column"
                gap="1rem"
              >
                <Field label="name">
                  <Input {...register("name")} />
                </Field>
                <Field label="username">
                  <Input {...register("username")} />
                </Field>
                <Field label="bio">
                  <Textarea {...register("bio")} />
                </Field>
              </Box>
            </DialogBody>
            <DialogFooter>
              <Button
                border="1px solid white"
                color="black"
                backgroundColor="white"
                height="2rem"
                borderRadius="1rem"
                loading={isPendingUpdateUser}
                type="submit"
              >
                Save
              </Button>
            </DialogFooter>
          </form>
          <DialogCloseTrigger
            onClick={() => {
              setEditDialog(false);
              setPreview(null);
            }}
          />
        </DialogContent>
      </DialogRoot>
      <ThreadForm
        state={state}
        load={load}
        interaction={interaction}
        handle={handle}
        threadId={null}
      />
      <ThreadDelete state={state} load={load} handle={handle} />
      <Toaster />
    </Box>
  );
}
