import { GridItem, Show, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Filter from "../views/Filter/Filter";
import NavigationWrapper from "../views/NavigationWrapper/NavigationWrapper";
import PageStackSpacing from "../views/PageStackSpacing/PageStackSpacing";
import Pagination from "../views/Pagination/Pagination";
import SearchResults from "../views/SearchResults/SearchResults";

const Search = () => {
  const router = useRouter();

  return (
    <NavigationWrapper>
      <PageStackSpacing>
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
      </PageStackSpacing>
    </NavigationWrapper>
  );
};

export default Search;
