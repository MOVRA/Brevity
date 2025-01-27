import { Box, Spinner } from "@chakra-ui/react";

export default function Loader() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Spinner size="xl" color="white" />
    </Box>
  );
}
