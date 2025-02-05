import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CreateFollow, DeleteFollow } from "@/tanstack/follow-tanstack";
import { FollowRelation } from "@/types/follow";
import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function UserBox({
  f,
  type,
}: {
  f: FollowRelation;
  type: string;
}) {
  const [followerFollowed, setFollowerFollowed] = useState<boolean>(() => {
    return f.follower?.followeByYou;
  });
  const [followingFollowed, setFollowingFollowed] = useState<boolean>(() => {
    return f.following?.followedByYou;
  });

  const { mutateAsync: mutateCreateFollow, isPending: isPendingCreateFollow } =
    CreateFollow();
  const { mutateAsync: mutateDeleteFollow, isPending: isPendingDeleteFollow } =
    DeleteFollow();

  return (
    <Box display="flex" justifyContent="space-between" padding="1rem 0rem">
      <Box display="flex" gap="0.7rem" alignItems="center">
        {type == "follower" ? (
          <Avatar
            src={f.follower.Profile.file ? f.follower.Profile.file : ""}
          />
        ) : (
          <Avatar
            src={f.following.Profile.file ? f.following.Profile.file : ""}
          />
        )}
        <Box display="flex" gap="0.5rem">
          {type == "follower" ? (
            <>
              <Text
                as="h1"
                color="white"
                fontSize="0.8rem"
                md={{ fontSize: "1rem" }}
              >
                {f.follower.name}
              </Text>
              <Text
                as="h1"
                color="grey"
                fontWeight="light"
                fontSize="0.8rem"
                md={{ fontSize: "1rem" }}
              >
                @{f.follower.username}
              </Text>
            </>
          ) : (
            <>
              {" "}
              <Text
                as="h1"
                color="white"
                fontSize="0.8rem"
                md={{ fontSize: "1rem" }}
              >
                {f.following.name}
              </Text>
              <Text
                as="h1"
                color="grey"
                fontWeight="light"
                fontSize="0.8rem"
                md={{ fontSize: "1rem" }}
              >
                @{f.following.username}
              </Text>
            </>
          )}
        </Box>
      </Box>
      {type == "follower" ? (
        <>
          {followerFollowed && (
            <Button
              color="gray"
              backgroundColor="transparent"
              borderRadius="1rem"
              border="1px solid gray"
              size={{ mdDown: "xs", mdTo2xl: "sm" }}
              loading={isPendingDeleteFollow}
              onClick={() => {
                setFollowerFollowed(false);
                mutateDeleteFollow(f.following.Profile.user.id);
              }}
            >
              Unfollow
            </Button>
          )}
          {!followerFollowed && (
            <Button
              color="white"
              backgroundColor="transparent"
              borderRadius="1rem"
              border="1px solid white"
              // height="2rem"
              size={{ mdDown: "xs", mdTo2xl: "sm" }}
              loading={isPendingCreateFollow}
              onClick={() => {
                setFollowerFollowed(true);
                mutateCreateFollow(f.following.Profile.user.id);
              }}
            >
              Follow
            </Button>
          )}
        </>
      ) : (
        <>
          {followingFollowed && (
            <Button
              color="gray"
              backgroundColor="transparent"
              borderRadius="1rem"
              border="1px solid gray"
              size={{ mdDown: "xs", mdTo2xl: "sm" }}
              loading={isPendingDeleteFollow}
              onClick={() => {
                setFollowingFollowed(false);
                mutateDeleteFollow(f.following.Profile.user.id);
              }}
            >
              Unfollow
            </Button>
          )}
          {!followingFollowed && (
            <Button
              color="white"
              backgroundColor="transparent"
              borderRadius="1rem"
              border="1px solid white"
              size={{ mdDown: "xs", mdTo2xl: "sm" }}
              loading={isPendingCreateFollow}
              onClick={() => {
                setFollowingFollowed(true);
                mutateCreateFollow(f.following.Profile.user.id);
              }}
            >
              Follow
            </Button>
          )}
        </>
      )}
    </Box>
  );
}
