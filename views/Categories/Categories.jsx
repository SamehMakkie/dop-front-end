import { Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CategoryCard from "../../components/Cards/CategoryCard";

const categories = [
  {
    name: "Action",
    link: "",
    start: "#00FFED",
    end: "#00B8BA"
  },
  {
    name: "Role-Playing",
    link: "",
    start: "#64E8DE",
    end: "#8A64EB"
  },
  {
    name: "Strategy",
    link: "",
    start: "#FFCF1B",
    end: "#FF881B"
},
{
    name: "Adventure",
    link: "",
    start: "#FF9897",
    end: "#F650A0"
},
{
    name: "Simulation",
    link: "",
    start: "#FFA62E",
    end: "#EA4D2C"
  },
  {
    name: "Sports & Racing",
    link: "",
    start: "#FFCDA5",
    end: "#EE4DFF"
  },
];

const Categories = ({ sectionTitle, fetchFunction }) => {
  return (
    <VStack w="100%" as={"section"} spacing={5} alignItems="start">
      <Heading size={["2xl"]}>{sectionTitle}</Heading>
      <SimpleGrid w="100%" py={5} columns={[1, 2, 3]} columnGap={10} rowGap={10}>
        {categories.map((category, i) => (
          <CategoryCard key={i} category={category.name} link={category.link} start={category.start} end={category.end} />
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default Categories;
