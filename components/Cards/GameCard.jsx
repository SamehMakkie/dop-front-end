import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti";
import {
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

const GameCard = ({ link, src, name, rating, price }) => {
  const getHighlightedRating = () => {
    const ratingList = [];
    let numOfPushedStars = 0;
    for (let i = 0; i < Math.floor(rating); ++i) {
      ++numOfPushedStars;
      ratingList.push(
        <Icon key={i} as={TiStarFullOutline} color="orange.400" />
      );
    }
    if (rating % 1 !== 0) {
      ++numOfPushedStars;
      ratingList.push(
        <Icon key={6} as={TiStarHalfOutline} color="orange.400" />
      );
    }

    if (numOfPushedStars < 5) {
      for (let i = numOfPushedStars; i < 5; ++i) {
        ratingList.push(
          <Icon key={i + 6} as={TiStarOutline} color="orange.400" />
        );
      }
    }
    return ratingList;
  };

  return (
    <Link href={link}>
      <MotionCard
        maxW={"xs"}
        boxShadow="none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}>
        <CardBody px={0} borderColor={"transparent"}>
          <VStack spacing={3} alignItems="start">
            <Image
              w="100%"
              h={"442px"}
              src={src}
              alt={name + "cover image"}
              borderRadius={"2xl"}
            />
            <Heading as="h3" size={["lg", "lg", "lg", "xl"]}>
              {name}
            </Heading>
            <Flex w="100%" justifyContent={"space-between"}>
              <HStack spacing={3}>
                <HStack spacing={2}>{getHighlightedRating()}</HStack>
                <Text>{rating}</Text>
              </HStack>
              <Heading as={"h4"} size={"lg"} color="secondary">
                {price}
              </Heading>
            </Flex>
          </VStack>
        </CardBody>
      </MotionCard>
    </Link>
  );
};

export default GameCard;
