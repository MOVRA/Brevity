import { Box } from "@chakra-ui/react";
import { SkeletonCircle, SkeletonText } from "../ui/skeleton";

export default function ThreadSkele() {
  const skele = 5;
  return (
    <>
      {Array.from({ length: skele }).map((_, index) => (
        <Box padding="1.3rem" key={index} borderBottom="1px solid #212121">
          <Box display="flex" gap="1rem">
            <SkeletonCircle size="10" />
            <Box display="flex" alignItems="center" marginBottom="1rem">
              <SkeletonText noOfLines={1} width="5rem" />
              <SkeletonText noOfLines={1} width="5rem" />
              <SkeletonText noOfLines={1} width="5rem" />
            </Box>
          </Box>
          <SkeletonText noOfLines={3} marginLeft="3.5rem" />
        </Box>
      ))}
    </>
  );
}
