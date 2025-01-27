// import { threadByUserId } from "@/api/thread";
// import { userById } from "@/api/user";
import bgBanner from "@/assets/pngtree-abstract-backgrouns-set-grunge-texture-minimalistic-art-brush-strokes-style-design-image_739359.jpg";
import ThreadBox from "@/components/custom/thread-box";
import ThreadDelete from "@/components/custom/thread-delete";
import ThreadForm from "@/components/custom/thread-form";
import ThreadSkele from "@/components/custom/thread-skele";
import { Avatar } from "@/components/ui/avatar";
import { Toaster } from "@/components/ui/toaster";
import { RootState } from "@/global/state/store";
import { useThread } from "@/hooks/thread-hook";
import { GetThreadByUserId } from "@/tanstack/thread-tanstack";
// import { GetThreadByUserId } from "@/tanstack/thread-tanstack";
// import { GetUserById } from "@/tanstack/user-tanstack";
import { Post } from "@/types/thread";
import { User } from "@/types/user";
import { Box, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

export default function Profile() {
  const params = useParams();
  const user = useSelector((state: RootState) => state.loggedUser.value);
  const [isPendingGetThreadByUserId, setIsPendingGetThreadByUserId] =
    useState(true);
  const [userProfile, setUserProfile] = useState<User>();
  // const [id, setId] = useState<string | undefined>("");
  const [thread, setThread] = useState<Post[]>();
  // const { data } = GetUserById(id);
  const navigate = useNavigate();
  const { handle, interaction, load, state } = useThread();
  // const { isFetching: isPendingGetThreadByUserId } = GetThreadByUserId(
  //   setThread,
  //   id
  // );

  useEffect(() => {
    function GetProfileData() {
      setUserProfile(user);
      if (!params.userId) {
        const { isSuccess } = GetThreadByUserId(setThread, user?.id);
        if (isSuccess) {
          setIsPendingGetThreadByUserId(false);
        }
      }
      return;
    }
    GetProfileData();
  }, [params, user]);

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
          {userProfile?.name}
        </Text>
      </Box>
      <Box display="flex" flexDirection="column">
        <Box padding="1rem">
          <Image
            src={bgBanner}
            height="10rem"
            width="100%"
            borderRadius="1rem"
            position="relative"
          />
          <Avatar
            src={userProfile?.Profile?.file}
            size="2xl"
            position="absolute"
            top="13rem"
            left="15rem"
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          marginTop="1rem"
          gap="0.2rem"
          padding="1rem"
          borderBottom="1px solid #212121"
        >
          <Box display="flex" flexDirection="column" gap="0.3rem">
            <Text as="h1" color="white" fontWeight="semibold" fontSize="1.2rem">
              {userProfile?.name}
            </Text>
            <Text color="gray" fontWeight="light" fontSize="0.9rem">
              @{userProfile?.username}
            </Text>
            <Text color="white" fontSize="0.8rem">
              {userProfile?.Profile?.bio}
            </Text>
          </Box>
          <Box display="flex" gap="0.8rem">
            <Text color="gray" fontSize="0.8rem" display="flex" gap="0.4rem">
              <span style={{ color: "white" }}>{user?.followerCount}</span>
              Follower
            </Text>
            <Text color="gray" fontSize="0.8rem" display="flex" gap="0.4rem">
              <span style={{ color: "white" }}>{user?.followingCount}</span>
              Following
            </Text>
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
