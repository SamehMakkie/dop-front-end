import { CloseIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Avatar,
  Badge,
  Button,
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Show,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsGrid, BsGridFill } from "react-icons/bs";
import { MdOutlineShoppingCart, MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import IconLink from "../../../components/IconLink/IconLink";
import { setNumOfItems } from "../../../redux/features/cartSlice";
import { toggle } from "../../../redux/features/searchVisibilitySlice";
import { clearUser } from "../../../redux/features/userSlice";
import getCartItems from "../../../services/getCartItems";

const LoggedInNav = ({ user }) => {
  const dispatch = useDispatch();
  const numOfItemsInCart = useSelector((state) => state.cartReducer.value);
  const isSearchVisible = useSelector(
    (state) => state.searchVisibilityReducer.value
  );
  const [picture, setPicture] = useState(user.picture);
  const router = useRouter();

  useEffect(() => {
    async function fetchCartItems() {
      if (user) {
        const { code, msg, data } = await getCartItems(user.id);
        if (code >= 0) {
          dispatch(setNumOfItems(data.length));
        }
      }
    }
    fetchCartItems();
  }, []);

  useEffect(() => {
    setPicture(user.picture);
  }, [user]);

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
      <Show above="md">
        <Link href={"/library"}>
          <Button leftIcon={<Icon as={BsGrid} boxSize="20px" fontSize={"lg"} />}>
            Library
          </Button>
        </Link>
      </Show>
      <Show below="md">
        <IconLink
          href={"/library"}
          defaultIcon={<Icon as={BsGrid} boxSize="20px" />}
          hoverIcon={<Icon as={BsGridFill} boxSize="20px" />}
        />
      </Show>
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
          <Avatar name={user.username} src={`${picture}?${Date.now()}`} />
        </MenuButton>
        <MenuList>
          <MenuItem
            cursor={"default"}
            fontWeight="bold"
            _hover={{ bgColor: "white" }}
            _focus={{ bgColor: "white" }}>
            {user.username}
          </MenuItem>

          <MenuItem
            onClick={() => {
              router.push("/user/information");
            }}>
            Profile
          </MenuItem>

          <MenuDivider />
          <MenuItem onClick={() => dispatch(clearUser())}>Log out</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default LoggedInNav;
