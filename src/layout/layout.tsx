import { isLoggedIn } from "@/api/auth";
import { Navigate, Outlet } from "react-router";
import LeftBar from "./leftbar";
import RightBar from "./rightbar";
import BottomBar from "./bottombar";
import { AddThread } from "@/components/custom/add-thread-button";
import { Box } from "@chakra-ui/react";

export default function Layout() {
  if (!isLoggedIn()) {
    return <Navigate to="/sign-in" />;
  }
  return (
    <>
      <main>
        <Box display="block" md={{ display: "flex" }} justifyContent="center">
          <LeftBar />
          <Outlet />
          <RightBar />
        </Box>
        <BottomBar />
      </main>
    </>
  );
}
