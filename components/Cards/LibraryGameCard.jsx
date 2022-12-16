import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti";
import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

const LibraryGameCard = ({ link, src, name, rating, price }) => {
  const toast = useToast();
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

  const handleDownloadButtonClick = () => {
    toast({
      title: "Download started",
      description: `Download for ${name} has started`,
      position: "top-right",
      isClosable: true,
      status: "loading",
    });
  };

  return (
    <MotionCard
      mr={[3, 5]}
      boxShadow="none"
      whiteSpace={"normal"}
      display="inline-block"
      maxW={["20rem", "15rem"]}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}>
      <CardBody px={0} borderColor={"transparent"}>
        <Link href={link}>
          <VStack spacing={3} alignItems="start">
            <Image
              w="100%"
              h={["450px", "350px"]}
              src={src}
              alt={name + "cover image"}
              borderRadius={"2xl"}
            />
            <Heading as="h3" size={"lg"} fontWeight="normal">
              {name}
            </Heading>
            <HStack w="100%" spacing={[3, 2]}>
              <HStack spacing={[1, 0]}>{getHighlightedRating()}</HStack>
              <Text>{rating}</Text>
            </HStack>
          </VStack>
        </Link>
        <Button
          w="100%"
          colorScheme={"teal"}
          onClick={handleDownloadButtonClick}>
          Download
        </Button>
      </CardBody>
    </MotionCard>
  );
};

export default LibraryGameCard;
