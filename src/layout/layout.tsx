import { isLoggedIn } from "@/api/auth";
import { Box } from "@chakra-ui/react";
import { Navigate, Outlet, useLocation, useParams } from "react-router";
import BottomBar from "./bottombar";
import LeftBar from "./leftbar";
import RightBar from "./rightbar";
import ReplyDialog from "@/components/custom/reply-trigger-box";

export default function Layout() {
  const location = useLocation();
  const params = useParams();

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
        <Box
          display="block"
          md={{ display: "none" }}
          position="sticky"
          bottom="0"
        >
          {location.pathname == `/thread/${params.threadId}` && <ReplyDialog />}
          {location.pathname != `/thread/${params.threadId}` && <BottomBar />}
        </Box>
      </main>
    </>
  );
}
