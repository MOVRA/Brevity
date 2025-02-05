import { isLoggedIn } from "@/api/auth";
import { Box } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router";
import BottomBar from "./bottombar";
import LeftBar from "./leftbar";
import RightBar from "./rightbar";

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
