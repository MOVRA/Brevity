import { Box, Text } from "@chakra-ui/react";

export default function RightBar() {
  return (
    <Box
      width="30%"
      height="100vh"
      borderLeft="1px solid #212121"
      top="0"
      position="sticky"
    >
      <Text>Right Bar</Text>
    </Box>
  );
}
