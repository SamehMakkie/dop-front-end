import { Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const CategoryCard = ({ category, link, start, end }) => {
  return (
    <Link href={link}>
      <Flex
        px={10}
        w="100%"
        h="200px"
        alignItems="center"
        bgColor={"gray.400"}
        borderRadius={"2xl"}
        justifyContent={"center"}
        bgGradient={`linear(to-br, ${start}, ${end})`}>
        <Heading size={"lg"} color={"whiteAlpha.900"}>
          {category}
        </Heading>
      </Flex>
    </Link>
  );
};

export default CategoryCard;
