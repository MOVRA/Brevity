import { Box, Text } from "@chakra-ui/react";
import { LuDoorOpen, LuHeart, LuHouse, LuSearch } from "react-icons/lu";
import { NavLink } from "react-router";
import { CgProfile } from "react-icons/cg";
import { Button } from "@/components/ui/button";

export default function LeftBar() {
  return (
    <Box
      width="20%"
      height="100vh"
      borderRight="1px solid #e6e6e6"
      top="0"
      position="sticky"
      display="flex"
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
          <Text as="h1" color="white" fontWeight="bold">
            BREVITY
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" margin="1rem 0.5rem">
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: "white",
              backgroundColor: isActive
                ? "rgba(93, 93, 93, 0.2)"
                : "transparent",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem",
              borderRadius: "1rem",
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
                ? "rgba(93, 93, 93, 0.2)"
                : "transparent",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem",
              borderRadius: "1rem",
            })}
          >
            <LuSearch />
            Like
          </NavLink>
          <NavLink
            to="/follow"
            style={({ isActive }) => ({
              color: "white",
              backgroundColor: isActive
                ? "rgba(93, 93, 93, 0.2)"
                : "transparent",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem",
              borderRadius: "1rem",
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
                ? "rgba(93, 93, 93, 0.2)"
                : "transparent",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem",
              borderRadius: "1rem",
            })}
          >
            <CgProfile />
            Profile
          </NavLink>
        </Box>
      </Box>
      <Box display="flex">
        <Button color="red" backgroundColor="transparent">
          <LuDoorOpen /> Sign-out
        </Button>
      </Box>
    </Box>
  );
}
