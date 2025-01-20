import { Avatar } from "@/components/ui/avatar";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { openDelete } from "@/global/state/dialog/delete-dialog.slice";
import { RootState } from "@/global/state/store";
import { Post } from "@/types/thread";
import { Box, Image, Text } from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { IoChatboxOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  thread: Post;
  handleLike: (a: string) => void;
  handleUnLike: (a: string) => void;
  setThreadId: (a: string) => void;
}

export default function HomeThread({
  thread,
  setThreadId,
  handleLike,
  handleUnLike,
}: Props) {
  const user = useSelector((state: RootState) => state.loggedUser.value);
  const dispatch = useDispatch();
  const [like, setLike] = useState(() => {
    return thread.likedByUser;
  });
  const [totalLike, setTotalLike] = useState(() => {
    return thread.likeCount;
  });

  return (
    <Box
      key={thread.id}
      display="flex"
      color="white"
      borderBottom="1px solid #212121"
      gap="1rem"
      padding="1.3rem"
    >
      <Avatar src={thread.author.Profile.file} />
      <Box display="flex" flexDirection="column" gap="0.5rem" width="100%">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" gap="0.5rem">
            <Text fontSize="0.9rem" fontWeight="semibold">
              {thread.author.name}
            </Text>
            <Text color="gray" fontWeight="light" fontSize="0.8rem">
              @{thread.author.username}
            </Text>
            <Text color="gray" fontWeight="light" fontSize="0.8rem">
              &#9679; {moment(thread.createdAt).startOf("minutes").fromNow()}
            </Text>
          </Box>
          <MenuRoot positioning={{ placement: "left-start" }}>
            {user?.id == thread.authorId ? (
              <MenuTrigger cursor="pointer" focusRing="none" border="none">
                <BsThreeDots color="white" />
              </MenuTrigger>
            ) : null}
            <MenuContent backgroundColor="black" border="1px solid #212121">
              <MenuItem
                value="edit"
                color="white"
                cursor="pointer"
                _hover={{ backgroundColor: "rgba(105, 105, 105, 0.5)" }}
              >
                Edit
              </MenuItem>
              <MenuItem
                value="delete"
                color="fg.error"
                cursor="pointer"
                _hover={{
                  backgroundColor: "rgba(133, 59, 59, 0.5)",
                }}
                onClick={() => {
                  dispatch(openDelete(true));
                  setThreadId(thread.id);
                }}
              >
                Delete
              </MenuItem>
            </MenuContent>
          </MenuRoot>
        </Box>
        <Box display="flex" flexDirection="column" gap="0.8rem">
          <Text fontSize="0.9rem">{thread.content}</Text>
          {thread.file && <Image src={thread.file} borderRadius="1rem" />}
          <Box display="flex" gap="1rem">
            {like ? (
              <Box display="flex" gap="0.7rem" alignItems="center">
                <GoHeartFill
                  cursor="pointer"
                  size="1.3rem"
                  onClick={() => {
                    setLike(false);
                    setTotalLike(totalLike - 1);
                    handleUnLike(thread.id);
                  }}
                  style={{ color: "red" }}
                />
                <Text color="white" fontSize="0.8rem">
                  {totalLike}
                </Text>
              </Box>
            ) : (
              <Box display="flex" gap="0.7rem" alignItems="center">
                <GoHeart
                  cursor="pointer"
                  size="1.3rem"
                  onClick={() => {
                    setLike(true);
                    setTotalLike(totalLike + 1);
                    handleLike(thread.id);
                  }}
                />
                {totalLike ? (
                  <Text color="white" fontSize="0.8rem">
                    {totalLike}
                  </Text>
                ) : null}
              </Box>
            )}
            <Box color="white">
              <IoChatboxOutline size="1.3rem" cursor="pointer" />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
