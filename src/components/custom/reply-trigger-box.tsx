import { RootState } from "@/global/state/store";
import { Box, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "../ui/avatar";
import { LuImage } from "react-icons/lu";
import { Button } from "../ui/button";
import { open } from "@/global/state/dialog/dialog-slice";

export default function ReplyDialog() {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state: RootState) => state.loggedUser.value);

  return (
    <Box
      borderTop="1px solid #212121"
      display="flex"
      backgroundColor="black"
      cursor="pointer"
      padding="1.5rem 1.5rem 1.5rem 1.5rem"
      alignItems="center"
      gap="1rem"
      borderBottom="1px solid #212121"
      justifyContent="space-between"
      onClick={() => dispatch(open(true))}
      md={{ borderTop: "none", position: "static" }}
    >
      <Box display="flex" alignItems="center" gap="1rem">
        <Avatar
          src={loggedUser?.Profile?.file}
          md={{ display: "block" }}
          display="none"
        />
        <Text color="gray">Type your reply!?</Text>
      </Box>
      <Box display="flex" alignItems="center" gap="1rem">
        <LuImage size="1.5rem" color="gray" />
        <Button
          disabled
          md={{ display: "block" }}
          display="none"
          backgroundColor="white"
          color="black"
          borderRadius="1rem"
          height="2rem"
        >
          Post
        </Button>
      </Box>
    </Box>
  );
}
