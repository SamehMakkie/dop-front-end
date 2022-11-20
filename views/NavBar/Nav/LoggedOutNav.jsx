import { Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const LoggedOutNav = () => {
  return (
    <>
      <Link href={"/login"}>
        <Button borderRadius={"2xl"} variant="ghost">
          Log in
        </Button>
      </Link>
      <Link href={"/Sign up"}>
        <Button borderRadius={"2xl"} colorScheme="teal" >Sign up</Button>
      </Link>
    </>
  );
};

export default LoggedOutNav;
