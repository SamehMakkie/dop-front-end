import { CloseIcon, Search2Icon } from "@chakra-ui/icons";
import { Button, Icon, Show } from "@chakra-ui/react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import IconLink from "../../../components/IconLink/IconLink";
import { toggle } from "../../../redux/features/searchVisibilitySlice";

const LoggedOutNav = () => {
  const dispatch = useDispatch();
  const isSearchVisible = useSelector(
    (state) => state.searchVisibilityReducer.value
  );
  return (
    <>
      <Show below="md">
        <IconLink
          href={""}
          defaultIcon={
            isSearchVisible ? <CloseIcon boxSize="14px" /> : <Search2Icon />
          }
          hoverIcon={
            isSearchVisible ? <CloseIcon boxSize="14px" /> : <Search2Icon />
          }
          onClick={() => dispatch(toggle())}
        />
      </Show>
      <Link href={"/signin"}>
        <Button borderRadius={"2xl"} variant="ghost" fontSize={"lg"}>
          Sign In
        </Button>
      </Link>
      <Link href={"/signup"}>
        <Button borderRadius={"2xl"} colorScheme="teal" fontSize={"lg"}>
          Register
        </Button>
      </Link>
    </>
  );
};

export default LoggedOutNav;
