import { GridItem, Show, SimpleGrid, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Filter from "../views/Filter/Filter";
import NavigationWrapper from "../views/NavigationWrapper/NavigationWrapper";
import Pagination from "../views/Pagination/Pagination";
import SearchResults from "../views/SearchResults/SearchResults";

const Search = () => {
  const router = useRouter();

  return (
    <NavigationWrapper>
      <VStack
        w="100%"
        px={[5, 10, 10, 32, 36]}
        pt={20}
        spacing={20}
        justifyContent="center">
        <SimpleGrid w="100%" columns={3}>
          <Show above="md">
            <GridItem colSpan={1}>
              <Filter query={router.query} />
            </GridItem>
          </Show>
          <GridItem colSpan={[3, 3, 2]}>
            <SearchResults />
          </GridItem>
        </SimpleGrid>
        <Pagination />
      </VStack>
    </NavigationWrapper>
  );
};

export default Search;
