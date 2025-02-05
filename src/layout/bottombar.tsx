import { Button } from "@/components/ui/button";
import { open } from "@/global/state/dialog/dialog-slice";
import { Box } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { LuHeart, LuHouse, LuPlus, LuSearch } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router";

export default function BottomBar() {
  const dispatch = useDispatch();
  const pathname = useLocation();
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      md={{ display: "none" }}
      backgroundColor="black"
      padding="1rem"
      bottom="0"
      position="sticky"
      gap="10%"
      justifyContent="center"
    >
      <NavLink
        to="/"
        style={({ isActive }) => ({
          color: "white",
          backgroundColor: isActive ? "rgba(93, 93, 93, 0.5)" : "transparent",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.5rem",
          fontSize: "1.5rem",
          borderRadius: "0.7rem",
        })}
      >
        <LuHouse />
      </NavLink>
      <NavLink
        to="/search"
        style={({ isActive }) => ({
          color: "white",
          backgroundColor: isActive ? "rgba(93, 93, 93, 0.5)" : "transparent",
          display: "flex",
          fontSize: "1.5rem",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.5rem",
          borderRadius: "0.7rem",
        })}
      >
        <LuSearch />
      </NavLink>
      <NavLink
        to="/follow"
        style={({ isActive }) => ({
          color: "white",
          backgroundColor: isActive ? "rgba(93, 93, 93, 0.5)" : "transparent",
          display: "flex",
          alignItems: "center",
          fontSize: "1.5rem",
          gap: "0.5rem",
          padding: "0.5rem",
          borderRadius: "0.7rem",
        })}
      >
        <LuHeart />
      </NavLink>
      <NavLink
        to="/profile"
        style={({ isActive }) => ({
          color: "white",
          backgroundColor: isActive ? "rgba(93, 93, 93, 0.5)" : "transparent",
          display: "flex",
          fontSize: "1.5rem",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.5rem",
          borderRadius: "0.7rem",
        })}
      >
        <CgProfile />
      </NavLink>
      <Button
        onClick={() =>
          pathname.pathname != "/" ? navigate("/") : dispatch(open(true))
        }
        style={{
          color: "white",
          display: "flex",
          fontSize: "1.5rem",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.5rem",
          borderRadius: "0.7rem",
        }}
      >
        <LuPlus />
      </Button>
    </Box>
  );
}
