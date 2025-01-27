import { InputGroup } from "@/components/ui/input-group";
import SearchUserBox from "@/components/custom/search-user-box";
import { GetUsers } from "@/tanstack/user-tanstack";
import { Users } from "@/types/user";
import { Box, Input, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";

export default function Search() {
  const [users, setUsers] = useState<Users[]>([]);
  const [filtered, setFiltered] = useState<Users[]>([]);
  const [item, setItem] = useState<string>("");
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
              filtered.map((f) => <SearchUserBox f={f} key={f.id} />)}
          </Box>
        </Box>
      )}
    </Box>
  );
}
