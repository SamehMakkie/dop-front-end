import { GridItem, Show, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import filterSearch from "../services/filterSearch";
import searchByName from "../services/searchByName";
import Filter from "../views/Filter/Filter";
import NavigationWrapper from "../views/NavigationWrapper/NavigationWrapper";
import PageStackSpacing from "../views/PageStackSpacing/PageStackSpacing";
import Pagination from "../views/Pagination/Pagination";
import SearchResults from "../views/SearchResults/SearchResults";

const Search = ({ finalData }) => {
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
            <SearchResults data={finalData} />
          </GridItem>
        </SimpleGrid>
        {/* {data.length > 10 && <Pagination />} */}
      </PageStackSpacing>
    </NavigationWrapper>
  );
};

export default Search;

export async function getServerSideProps(context) {
  const query = context.query;
  const slang = query.slang;

  let finalData = [];
  if (slang) {
    const { code, msg, data } = await searchByName(slang);
    console.log("#########################");
    console.log(slang);
    console.log(code);
    console.log(msg);
    console.log(data);

    finalData = data;
  } else {
    const maxPrice = query.maxPrice;
    const minAge = query.minAge;
    const genre_ids = query.genre_ids;

    const { code, msg, data } = await filterSearch(maxPrice, minAge, genre_ids);

    finalData = data;
  }
  return {
    props: {
      finalData,
    },
  };
}
