import {
  Divider,
  GridItem,
  Image,
  Link,
  Show,
  SimpleGrid,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchElement from "../../components/SearchElement/SearchElement";
import { setFalse } from "../../redux/features/searchVisibilitySlice";
import Nav from "./Nav/Nav";

const NavBar = () => {
  const isSearchVisible = useSelector(
    (state) => state.searchVisibilityReducer.value
  );
  const [aboveSM] = useMediaQuery("(min-width: 48em)");
  const dispatch = useDispatch();

  useEffect(() => {
    if (aboveSM) {
      dispatch(setFalse());
    }
  }, [aboveSM, dispatch]);

  return (
    <>
      <SimpleGrid
        top={0}
        px={[4, 10]}
        zIndex={10}
        as={"header"}
        minH={"100px"}
        bgColor={"white"}
        position={"sticky"}
        alignItems={"center"}
        columns={{ base: 2, md: 3 }}
        justifyContent="space-between"
        borderRadius="0px 0px 20px 20px">
        <GridItem colSpan={[]}>
          {isSearchVisible ? (
            <SearchElement />
          ) : (
            <Link href="/">
              <Image
                width="120px"
                src="https://thumbs.dreamstime.com/b/letter-pixel-icon-logo-design-element-can-be-used-as-as-complement-to-96097118.jpg"
                alt="DoP logo"
              />
            </Link>
          )}
        </GridItem>
        <Show above="md">
          <GridItem display={"flex"} justifyContent={"center"}>
            <SearchElement />
          </GridItem>
        </Show>

        <GridItem w="100%" display={"flex"} justifyContent={"end"}>
          <Nav />
        </GridItem>
      </SimpleGrid>
      <Divider w="90%" mx="auto" />
    </>
  );
};

export default NavBar;
