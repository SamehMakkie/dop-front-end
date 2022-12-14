import { HStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";

const Nav = () => {
  const user = useSelector((state) => state.userReducer.value);

  return (
    <HStack as={"nav"} spacing={[2, 2, 4]} justifyContent="end">
      {user ? <LoggedInNav user={user} /> : <LoggedOutNav />}
    </HStack>
  );
};

export default Nav;
