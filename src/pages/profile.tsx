import { threadByUserId } from "@/api/thread";
import { userById } from "@/api/user";
import bgBanner from "@/assets/pngtree-abstract-backgrouns-set-grunge-texture-minimalistic-art-brush-strokes-style-design-image_739359.jpg";
import ThreadBox from "@/components/custom/thread-box";
import ThreadDelete from "@/components/custom/thread-delete";
import ThreadForm from "@/components/custom/thread-form";
import ThreadSkele from "@/components/custom/thread-skele";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { RootState } from "@/global/state/store";
import { useThread } from "@/hooks/thread-hook";
import { Post } from "@/types/thread";
import { User } from "@/types/user";
import { Box, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

export default function Profile() {
  const params = useParams();
  const [users, setUsers] = useState<User>();
  const user = useSelector((state: RootState) => state.loggedUser.value);
  const [isPendingGetThreadByUserId, setIsPendingGetThreadByUserId] =
    useState<boolean>(true);
  const [thread, setThread] = useState<Post[]>();
  const navigate = useNavigate();
  const { handle, interaction, load, state } = useThread();

  useEffect(() => {
    async function GetProfileData() {
      try {
        setIsPendingGetThreadByUserId(true);
        if (params.userId) {
          const userData = await userById(params.userId);
          setUsers(userData.data);
          const threadData = await threadByUserId(params.userId);
          setThread(threadData.data);
          console.log("masuk");
          return;
        }
        const userData = await userById(user?.id);
        setUsers(userData.data);
        const threadData = await threadByUserId(user?.id);
        setThread(threadData.data);
      } catch (error) {
        console.log(error);
        return;
      } finally {
        setIsPendingGetThreadByUserId(false);
      }
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
          {users?.name}
        </Text>
      </Box>
      <Box display="flex" flexDirection="column">
        <Box display="flex" padding="1rem 1rem 0rem 1rem">
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
        </Box>
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
            <Text as="h1" color="white" fontWeight="semibold" fontSize="1.2rem">
              {users?.name}
            </Text>
            <Text color="gray" fontWeight="light" fontSize="0.8rem">
              @{users?.username}
            </Text>
            <Text color="white" fontSize="0.8rem">
              {users?.Profile?.bio}
            </Text>
            <Box display="flex" gap="0.8rem">
              <Text color="gray" fontSize="0.8rem" display="flex" gap="0.4rem">
                <span style={{ color: "white" }}>{users?.followerCount}</span>
                Follower
              </Text>
              <Text color="gray" fontSize="0.8rem" display="flex" gap="0.4rem">
                <span style={{ color: "white" }}>{users?.followingCount}</span>
                Following
              </Text>
            </Box>
          </Box>
          <Button
            marginRight="1rem"
            backgroundColor="transparent"
            border="1px solid white"
            color="white"
            borderRadius="2rem"
          >
            {users?.id != user?.id ? "Follow" : "Edit"}
          </Button>
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
