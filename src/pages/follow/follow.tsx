import { RootState } from "@/global/state/store";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { Tabs } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { User } from "@/types/follow";
import { GetFollow } from "@/tanstack/follow/follow-tanstack";
import { Avatar } from "@/components/ui/avatar";

export default function Follow() {
  const [follow, setFollow] = useState<User>();
  const me = useSelector((state: RootState) => state.loggedUser.value);
  const { isFetching } = GetFollow(me?.id, setFollow);

  console.log(follow);

  return (
    <Box width="100%">
      <Tabs.Root defaultValue="followers" padding="1rem">
        <Tabs.List>
          <Tabs.Trigger
            value="followers"
            color="white"
            width="50%"
            display="flex"
            justifyContent="center"
            _selected={{ borderBottom: "3px solid blue" }}
          >
            Follower
          </Tabs.Trigger>
          <Tabs.Trigger
            value="following"
            color="white"
            width="50%"
            display="flex"
            justifyContent="center"
            _selected={{ borderBottom: "3px solid blue" }}
          >
            Following
          </Tabs.Trigger>
        </Tabs.List>
        {isFetching && (
          <Box
            height="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner size="xl" color="white" />
          </Box>
        )}
        {!isFetching && (
          <>
            <Tabs.Content value="followers">
              {follow?.Follower.map(() => (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  padding="1rem 0rem"
                >
                  <Box display="flex" gap="0.7rem">
                    <Avatar  />
                    <Box display="flex" gap="0.5rem">
                      <Text as="h1" color="white">
                        User
                      </Text>
                      <Text as="h1" color="grey" fontWeight="light">
                        @User
                      </Text>
                    </Box>
                  </Box>
                  {/* {f.followedByYou && (
                    <Button
                      color="gray"
                      backgroundColor="transparent"
                      borderRadius="1rem"
                      border="1px solid gray"
                      height="2rem"
                    >
                      Unfollow
                    </Button>
                  )}
                  {!f.followedByYou && (
                    <Button
                      color="white"
                      backgroundColor="transparent"
                      borderRadius="1rem"
                      border="1px solid white"
                      height="2rem"
                    >
                      Follow
                    </Button>
                  )} */}
                </Box>
              ))}
            </Tabs.Content>
            <Tabs.Content value="following">
              <Text color="white">tes2</Text>
            </Tabs.Content>
          </>
        )}
      </Tabs.Root>
    </Box>
  );
}
