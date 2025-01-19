import { Box } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router";
import { userMe } from "./api/user";
import { AppDispatch } from "./global/store";
import { setUserLoggedIn } from "./global/user/user-slice";
import Layout from "./layout/layout";
import Follow from "./pages/follow/follow";
import Home from "./pages/home/home";
import Loader from "./pages/loader/loader";
import Login from "./pages/login/login";
import Profile from "./pages/profile/profile";
import Search from "./pages/search/search";

export default function App() {
  const [load, setLoad] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!Cookies.get("cookies")) {
      setLoad(false);
      return;
    }
    async function getUser() {
      try {
        const user = await userMe();
        dispatch(setUserLoggedIn(user.data));
      } catch {
        setLoad(false);
        return;
      } finally {
        setLoad(false);
      }
    }
    getUser();
  }, [dispatch]);

  if (load)
    return (
      <Box>
        <Loader />
      </Box>
    );

  return (
    <Routes>
      <Route path="/sign-in" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/follow" element={<Follow />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
