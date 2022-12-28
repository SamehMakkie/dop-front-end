import { Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import CategoryCard from "../../components/Cards/CategoryCard";

const categories = [
  {
    id: 1,
    name: "Action",
    link: "",
    start: "#00FFED",
    end: "#00B8BA",
  },
  {
    id: 2,
    name: "Adventure",
    link: "",
    start: "#FF9897",
    end: "#F650A0",
  },
  {
    id: 3,
    name: "Role-Playing",
    link: "",
    start: "#64E8DE",
    end: "#8A64EB",
  },
  {
    id: 4,
    name: "Simulation",
    link: "",
    start: "#FFA62E",
    end: "#EA4D2C",
  },
  {
    id: 5,
    name: "Strategy",
    link: "",
    start: "#FFCF1B",
    end: "#FF881B",
  },
];

const Categories = ({ sectionTitle, fetchFunction }) => {
  return (
    <VStack w="100%" as={"section"} spacing={5} alignItems="start">
      <Heading
        w="100%"
        size={["2xl"]}
        textAlign={["center", "center", "start"]}>
        {sectionTitle}
      </Heading>
      <SimpleGrid
        w="100%"
        py={5}
        columns={[1, 2, 3]}
        columnGap={10}
        rowGap={10}>
        {categories.map((category, i) => (
          <CategoryCard
            key={i}
            category={category.name}
            link={`search?slang=&page=1&categories=[${category.name.toLowerCase()}]&genre_ids=${
              category.id
            }%23&maxPrice=70&minAge=3`}
            start={category.start}
            end={category.end}
          />
        ))}
        <CategoryCard
          category={"Sports & Racing"}
          link={`search?slang=&page=1&categories=[${"sports-and-racing"}]&genre_ids=6%23&maxPrice=70&minAge=3`}
          start="#FFCDA5"
          end="#EE4DFF"
        />
      </SimpleGrid>
    </VStack>
  );
};

export default Categories;
