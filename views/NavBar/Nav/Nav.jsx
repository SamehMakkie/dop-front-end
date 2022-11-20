import { HStack } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";

const Nav = () => {
  const user = useSelector((state) => state.userReducer.value);

  return (
    <HStack as={"nav"} spacing={[2, 2, 4]} justifyContent="end">
      {user ? <LoggedInNav /> : <LoggedOutNav />}
    </HStack>
  );
};

export default Nav;
