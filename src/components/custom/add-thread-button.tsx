import { LuPlus } from "react-icons/lu";
import { Button } from "../ui/button";

export function AddThread() {
  return (
    <Button
      borderRadius="50%"
      backgroundColor="white"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="12%"
      height="4.5%"
      top="80%"
      bottom="0"
      left="80%"
      color="black"
      position="sticky"
      md={{ display: "none" }}
    >
      <LuPlus />
    </Button>
  );
}
