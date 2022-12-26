import { Button, Icon, Show } from "@chakra-ui/react";
import Link from "next/link";

const LoggedOutNav = () => {
  return (
    <>
      <Show above="lg">
        <Link href="/">
          <Button borderRadius={"2xl"} variant="ghost">
            Home
          </Button>
        </Link>
        <Link href="/about">
          <Button borderRadius={"2xl"} variant="ghost">
            About
          </Button>
        </Link>
      </Show>
      <Link href={"/signin"}>
        <Button borderRadius={"2xl"} variant="ghost">
          Sign In
        </Button>
      </Link>
      <Link href={"/signup"}>
        <Button borderRadius={"2xl"} colorScheme="teal">
          Register
        </Button>
      </Link>
    </>
  );
};

export default LoggedOutNav;
