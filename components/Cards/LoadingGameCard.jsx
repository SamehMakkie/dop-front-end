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
    Skeleton,
    SkeletonText,
    Text,
    VStack,
  } from "@chakra-ui/react";
  import React from "react";
  
  const LoadingGameCard = () => {
  
    return (
        <Card maxW={"xs"} boxShadow="none">
          <CardBody px={0} borderColor={"transparent"}>
            <VStack spacing={3} alignItems="start">
                <Skeleton w="100%" h="442px" borderRadius={"2xl"} />
                <SkeletonText w="100%" noOfLines={2} spacing={3} />
            </VStack>
          </CardBody>
        </Card>
    );
  };
  
  export default LoadingGameCard;
  