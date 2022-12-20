import { GridItem, Show, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import searchByName from "../services/searchByName";
import Filter from "../views/Filter/Filter";
import NavigationWrapper from "../views/NavigationWrapper/NavigationWrapper";
import PageStackSpacing from "../views/PageStackSpacing/PageStackSpacing";
import Pagination from "../views/Pagination/Pagination";
import SearchResults from "../views/SearchResults/SearchResults";

const Search = ({ data }) => {
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
            <SearchResults data={data} />
          </GridItem>
        </SimpleGrid>
        {/* {data.length > 10 && <Pagination />} */}
      </PageStackSpacing>
    </NavigationWrapper>
  );
};

export default Search;

export async function getServerSideProps(context) {
  const slang = context.query.slang;
  const data = await searchByName(slang);
  return {
    props: {
      data,
    },
  };
}
