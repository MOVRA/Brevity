import { Avatar } from "@/components/ui/avatar";
import { Box, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Users } from "@/types/user";
import { useState } from "react";
import { CreateFollow, DeleteFollow } from "@/tanstack/follow-tanstack";

export default function SearchUserBox({ f }: { f: Users }) {
  const [follow, setFollow] = useState<boolean>(() => {
    return f.followedByYou;
  });
  const { mutateAsync: mutateCreateFollow, isPending: isPendingCreateFollow } =
    CreateFollow();
  const { mutateAsync: mutateDeleteFollow, isPending: isPendingDeleteFollow } =
    DeleteFollow();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      padding="1rem 0rem"
      gap="1rem"
    >
      <Box display="flex" gap="0.7rem" alignItems="center">
        <Avatar src={f.profile.file} />
        <Box display="flex" gap="0.5rem">
          <Text
            as="h1"
            color="white"
            fontSize="0.8rem"
            md={{ fontSize: "1rem" }}
          >
            {f.name}
          </Text>
          <Text
            as="h1"
            color="grey"
            fontWeight="light"
            fontSize="0.8rem"
            md={{ fontSize: "1rem" }}
          >
            @{f.username}
          </Text>
        </Box>
      </Box>
      {follow && (
        <Button
          color="gray"
          backgroundColor="transparent"
          borderRadius="1rem"
          border="1px solid gray"
          size={{ mdDown: "xs", mdTo2xl: "sm" }}
          loading={isPendingDeleteFollow}
          onClick={() => {
            setFollow(false);
            mutateDeleteFollow(f.profile.userId);
          }}
        >
          Unfollow
        </Button>
      )}
      {!follow && (
        <Button
          color="white"
          backgroundColor="transparent"
          borderRadius="1rem"
          border="1px solid white"
          size={{ mdDown: "xs", mdTo2xl: "sm" }}
          loading={isPendingCreateFollow}
          onClick={() => {
            setFollow(true);
            mutateCreateFollow(f.profile.userId);
          }}
        >
          Follow
        </Button>
      )}
    </Box>
  );
}
