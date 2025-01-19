import { isLoggedIn } from "@/api/auth";
import { Navigate, Outlet } from "react-router";
import LeftBar from "./leftbar";
import RightBar from "./rightbar";

export default function Layout() {
  if (!isLoggedIn()) {
    return <Navigate to="/sign-in" />;
  }
  return (
    <>
      <main style={{ display: "flex", justifyContent: "center" }}>
        <LeftBar />
        <Outlet />
        <RightBar />
      </main>
    </>
  );
}
