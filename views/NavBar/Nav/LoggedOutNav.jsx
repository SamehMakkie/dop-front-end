import { Button } from "@chakra-ui/react";
import Link from "next/link";

const LoggedOutNav = () => {
  return (
    <>
      <Link href={"/signin"}>
        <Button borderRadius={"2xl"} variant="ghost">
          Sign In
        </Button>
      </Link>
      <Link href={"/signup"}>
        <Button borderRadius={"2xl"} colorScheme="teal" >Sign Up</Button>
      </Link>
    </>
  );
};

export default LoggedOutNav;
