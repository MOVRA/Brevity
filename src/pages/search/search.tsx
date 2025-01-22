import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { InputGroup } from "@/components/ui/input-group";
import { GetUsers } from "@/tanstack/users/user-tanstack";
import { Users } from "@/types/user";
import { Box, Input, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";

export default function Search() {
  const [users, setUsers] = useState<Users[]>([]);
  const [filtered, setFiltered] = useState<Users[]>([]);
  const [item, setItem] = useState<string>();
  const [searched, setSearched] = useState<boolean>(false);
  const { isFetching } = GetUsers(setUsers);

  function handleFilter(e) {
    const search = e.target.value;
    setItem(search);

    if (search) setSearched(true);
    else setSearched(false);

    const usersFiltered = users.filter((u) =>
      u.username.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(usersFiltered);
  }

  return (
    <Box width="100%">
      {isFetching && (
        <Box
          height="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner size="xl" color="white" />
        </Box>
      )}
      {!isFetching && (
        <Box padding="1rem">
          <InputGroup
            flex="1"
            startElement={<LuSearch size="1.2rem" color="white" />}
            width="100%"
          >
            <Input
              color="white"
              borderRadius="1.5rem"
              size="lg"
              onChange={handleFilter}
              placeholder="Search"
              value={item}
              _placeholder={{ color: "white" }}
            />
          </InputGroup>
          <Box padding="1rem">
            {searched &&
              filtered.map((f) => (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  padding="1rem 0rem"
                >
                  <Box display="flex" gap="0.7rem">
                    <Avatar src={f.profile.file} />
                    <Box display="flex" gap="0.5rem">
                      <Text as="h1" color="white">
                        {f.name}
                      </Text>
                      <Text as="h1" color="grey" fontWeight="light">
                        @{f.username}
                      </Text>
                    </Box>
                  </Box>
                  {f.followedByYou && (
                    <Button
                      color="gray"
                      backgroundColor="transparent"
                      borderRadius="1rem"
                      border="1px solid gray"
                      height="2rem"
                    >
                      Unfollow
                    </Button>
                  )}
                  {!f.followedByYou && (
                    <Button
                      color="white"
                      backgroundColor="transparent"
                      borderRadius="1rem"
                      border="1px solid white"
                      height="2rem"
                    >
                      Follow
                    </Button>
                  )}
                </Box>
              ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
