import { CloseIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Avatar,
  Badge,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Show,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsGrid, BsGridFill } from "react-icons/bs";
import { MdOutlineShoppingCart, MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import IconLink from "../../../components/IconLink/IconLink";
import { toggle } from "../../../redux/features/searchVisibilitySlice";
import { clearUser } from "../../../redux/features/userSlice";

const LoggedInNav = () => {
  const dispatch = useDispatch();
  const [numOfItemsInCart, setNumOfItemsInCart] = useState(1);
  const isSearchVisible = useSelector((state) => state.searchVisibilityReducer.value);
  const user = useSelector((state) => state.userReducer.value)

  return (
    <>
      <Show below="md">
        <IconLink
          href={""}
          defaultIcon={ isSearchVisible ? <CloseIcon boxSize="14px" /> : <Search2Icon  />}
          hoverIcon={isSearchVisible ? <CloseIcon boxSize="14px" /> : <Search2Icon />}
          onClick={() => dispatch(toggle())}
        />
      </Show>
      <IconLink
        href={"/library"}
        defaultIcon={<Icon as={BsGrid} boxSize="20px" />}
        hoverIcon={<Icon as={BsGridFill} boxSize="20px" />}
      />
      <Flex position={"relative"}>
        <IconLink
          href={"/cart"}
          defaultIcon={<Icon as={MdOutlineShoppingCart} boxSize="20px" />}
          hoverIcon={<Icon as={MdShoppingCart} boxSize="20px" />}
        />
        <Badge
          position={"absolute"}
          right={0}
          bgColor="primary"
          color={"white"}
          borderRadius={"0px 10px 0px 10px"}
          display="flex"
          alignItems={"center"}
          h="30px">
          {numOfItemsInCart != 0 && numOfItemsInCart}
        </Badge>
      </Flex>
      <Menu>
        <MenuButton>
          <Avatar name={user.username} />
        </MenuButton>
        <MenuList>
          <MenuItem
            cursor={"default"}
            fontWeight="bold"
            _hover={{ bgColor: "white" }}
            _focus={{ bgColor: "white" }}>
            {user.username}
          </MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuDivider />
          <MenuItem onClick={() => dispatch(clearUser())}>Log out</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default LoggedInNav;
