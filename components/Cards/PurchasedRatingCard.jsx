import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import { Button, Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

const PurchasedRatingCard = () => {
  const [rating, setRating] = useState(0);
  const array = [...Array(5).keys()];

  const handleStarClicked = (index) => {
    // Update the rating in the database
    // setState
    setRating(index + 1);
  };

  return (
    <VStack
      p={10}
      mx="auto"
      maxW="360px"
      maxH="250px"
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
            onClick={() => {
              handleStarClicked(index);
            }}
            cursor="pointer"
            as={index < rating ? TiStarFullOutline : TiStarOutline}
            color={index < rating ? "orange.400" : "gra.400"}
          />
        ))}
        <Text fontSize={"sm"}>{rating}</Text>
      </HStack>
      <Button w="100%" colorScheme={"teal"}>
        Download
      </Button>
    </VStack>
  );
};

export default PurchasedRatingCard;
