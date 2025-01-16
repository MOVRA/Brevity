import { Navigate, Route, Routes } from "react-router";
import Layout from "./layout/layout";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Search from "./pages/search/search";
import Follow from "./pages/follow/follow";
import Profile from "./pages/profile/profile";

export default function App() {
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
