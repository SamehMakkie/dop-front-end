import {
  Button,
  Divider,
  GridItem,
  HStack,
  Image,
  Show,
  SimpleGrid,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchElement from "../../components/SearchElement/SearchElement";
import { setFalse } from "../../redux/features/searchVisibilitySlice";
import Link from "next/link";
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
            <HStack w="100%" spacing={3}>
              <Link href="/">
                <Image width="100px" src="/DoPa128.png" alt="DoP logo" />
              </Link>
              <Show above="lg">
                <HStack spacing={3}>
                  <Link href="/">
                    <Button borderRadius={"2xl"} variant="ghost" fontSize={"lg"}>
                      Home
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button borderRadius={"2xl"} variant="ghost" fontSize={"lg"}>
                      About
                    </Button>
                  </Link>
                </HStack>
              </Show>
            </HStack>
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
