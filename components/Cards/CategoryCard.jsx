import { Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { motion } from "framer-motion";

const MotionFlex = motion(Flex)

const CategoryCard = ({ category, link, start, end }) => {
  return (
    <Link href={link}>
      <MotionFlex
        px={10}
        w="100%"
        h="250px"
        alignItems="center"
        bgColor={"gray.400"}
        borderRadius={"2xl"}
        justifyContent={"center"}
        bgGradient={`linear(to-br, ${start}, ${end})`}
        whileHover={{ scale: 1.1}}
        whileTap={{scale: 0.9}}
        transition={{duration: 0.2}}
        >
        <Heading size={"lg"} color={"whiteAlpha.900"}>
          {category}
        </Heading>
      </MotionFlex>
    </Link>
  );
};

export default CategoryCard;
