import bgBanner from "@/assets/pngtree-abstract-backgrouns-set-grunge-texture-minimalistic-art-brush-strokes-style-design-image_739359.jpg";
import { Avatar } from "@/components/ui/avatar";
import { RootState } from "@/global/state/store";
import { Box, Image, Text } from "@chakra-ui/react";
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router";

export default function RightBar() {
  const user = useSelector((state: RootState) => state.loggedUser.value);
  const location = useLocation();

  return (
    <Box
      width="35%"
      height="100vh"
      borderLeft="1px solid #212121"
      top="0"
      position="sticky"
      padding="1rem 0rem"
    >
      <Box
        display="flex"
        flexDirection="column"
        padding="0.1rem 1rem"
        gap="1rem"
      >
        {location.pathname != "/profile" && (
          <Box
            backgroundColor="#212121"
            borderRadius="1rem"
            display="flex"
            flexDirection="column"
            gap="2rem"
          >
            <Box position="relative">
              <Image
                src={bgBanner}
                borderRadius="1rem 1rem 0rem 0rem"
                height="3.5rem"
                width="100%"
              />
              <Avatar
                src={user?.Profile?.file}
                position="absolute"
                size="2xl"
                border="1px solid white"
                top="2rem"
                left="5.5rem"
              />
            </Box>
            <Box
              padding="1rem"
              display="flex"
              flexDirection="column"
              gap="0.3rem"
              width="100%"
              alignItems="center"
            >
              <Text color="white" fontWeight="semibold" fontSize="1.2rem">
                {user?.name}
              </Text>
              <Box display="flex" color="white" gap="1rem" fontSize="0.8rem">
                <Link to="/follow">{user?.followerCount} Follower</Link>
                <Link to="/follow">{user?.followingCount} Following</Link>
              </Box>
            </Box>
          </Box>
        )}
        <Box
          width="100%"
          padding="1rem"
          backgroundColor="#212121"
          borderRadius="1rem"
          display="flex"
          flexDirection="column"
          gap="0.8rem"
          alignItems="center"
        >
          <Text color="white" fontWeight="semibold" fontSize="0.8rem">
            Developed by Gibran Maulana
          </Text>
          <Box display="flex" gap="0.8rem" color="white" fontSize="0.9rem">
            <a href="">
              <BsGithub />
            </a>
            <a href="">
              <BsLinkedin />
            </a>
            <a href="">
              <BsFacebook />
            </a>
            <a href="">
              <BsInstagram />
            </a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
