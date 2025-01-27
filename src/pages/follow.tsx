import UserBox from "@/components/custom/follow-user-box";
import { RootState } from "@/global/state/store";
import { GetFollow } from "@/tanstack/follow-tanstack";
import { User } from "@/types/follow";
import { Box, Spinner, Tabs } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Follow() {
  const [follow, setFollow] = useState<User>();
  const me = useSelector((state: RootState) => state.loggedUser.value);
  const { isFetching } = GetFollow(me?.id, setFollow);

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
              {follow?.Follower.map((f) => (
                <UserBox f={f} key={f.id} type={"follower"} />
              ))}
            </Tabs.Content>
            <Tabs.Content value="following">
              {follow?.Following.map((f) => (
                <UserBox f={f} key={f.id} type={"following"} />
              ))}
            </Tabs.Content>
          </>
        )}
      </Tabs.Root>
    </Box>
  );
}
