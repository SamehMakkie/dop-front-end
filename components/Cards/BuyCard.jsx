import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import { Button, Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

const BuyCard = () => {
  const [rating, setRating] = useState(0);
  const array = [...Array(5).keys()];

  return (
    <VStack
      p={10}
      mx="auto"
      maxW="360px"
      maxH="350px"
      spacing={5}
      rounded={"2xl"}
      borderWidth="1px"
      alignItems="center"
      justifyContent={"center"}>
      <Heading fontSize={["2xl", "3xl"]}>See Rating</Heading>
      <HStack>
        {array.map((star, index) => (
          <Icon
            key={index}
            boxSize={[6, 10]}
            cursor="pointer"
            as={index < rating ? TiStarFullOutline : TiStarOutline}
            color={index < rating ? "orange.400" : "gra.400"}
          />
        ))}
        <Text fontSize={"sm"}>{rating}</Text>
      </HStack>
      <Button w="100%" colorScheme={"teal"} variant="outline">
        Add to Card
      </Button>
      <Button w="100%" colorScheme={"teal"}>
        Buy now
      </Button>
    </VStack>
  );
};

export default BuyCard;
