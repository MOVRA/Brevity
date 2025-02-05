import { Box, Text } from "@chakra-ui/react";
import { LuDoorOpen, LuHeart, LuHouse, LuSearch } from "react-icons/lu";
import { NavLink, useLocation, useNavigate } from "react-router";
import { CgProfile } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { open } from "@/global/state/dialog/dialog-slice";
import Cookies from "js-cookie";

export default function LeftBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      width="25%"
      height="100vh"
      borderRight="1px solid #212121"
      top="0"
      position="sticky"
      display="none"
      md={{ display: "flex" }}
      justifyContent="space-between"
      flexDirection="column"
    >
      <Box display="flex" flexDirection="column">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="1rem"
        >
          <Text as="h1" color="white" fontWeight="bold" fontSize="1.5rem">
            BREVITY
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" margin="1rem 0.5rem">
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: "white",
              backgroundColor: isActive
                ? "rgba(93, 93, 93, 0.5)"
                : "transparent",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem",
              borderRadius: "0.7rem",
            })}
          >
            <LuHouse />
            Home
          </NavLink>
          <NavLink
            to="/search"
            style={({ isActive }) => ({
              color: "white",
              backgroundColor: isActive
                ? "rgba(93, 93, 93, 0.5)"
                : "transparent",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem",
              borderRadius: "0.7rem",
            })}
          >
            <LuSearch />
            Search
          </NavLink>
          <NavLink
            to="/follow"
            style={({ isActive }) => ({
              color: "white",
              backgroundColor: isActive
                ? "rgba(93, 93, 93, 0.5)"
                : "transparent",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem",
              borderRadius: "0.7rem",
            })}
          >
            <LuHeart />
            Follow
          </NavLink>
          <NavLink
            to="/profile"
            style={({ isActive }) => ({
              color: "white",
              backgroundColor: isActive
                ? "rgba(93, 93, 93, 0.5)"
                : "transparent",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem",
              borderRadius: "0.7rem",
            })}
          >
            <CgProfile />
            Profile
          </NavLink>
          <Button
            marginTop="1rem"
            onClick={() => {
              if (location.pathname != "/") {
                navigate("/");
                return;
              }
              dispatch(open(true));
            }}
            backgroundColor="white"
            color="black"
            width="100%"
            borderRadius="1rem"
            height="2rem"
          >
            Create Post
          </Button>
        </Box>
      </Box>
      <Box display="flex">
        <Button
          color="red"
          backgroundColor="transparent"
          onClick={() => {
            Cookies.remove("cookies");
            window.location.href = "/sign-in";
          }}
        >
          <LuDoorOpen /> Sign-out
        </Button>
      </Box>
    </Box>
  );
}
