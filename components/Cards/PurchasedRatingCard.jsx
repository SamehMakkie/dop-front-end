import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import {
  Button,
  Heading,
  HStack,
  Icon,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import updateRating from "../../services/updateRating";

const PurchasedRatingCard = ({ gameId, databaseRating }) => {
  const [upToDateRating, setUpToDateRating] = useState(databaseRating);
  const user = useSelector((state) => state.userReducer.value);
  const [rating, setRating] = useState(0);
  const array = [...Array(5).keys()];
  const toast = useToast();

  const handleStarClicked = async (index) => {
    // Update the rating in the database
    const { code, msg, totalRating } = await updateRating(
      user.id,
      gameId,
      index + 1
    );
    if (code > 0) {
      setUpToDateRating(totalRating);
    }

    // setState
    setRating(index + 1);
  };

  const handleDownloadBtnClick = () => {
    toast({
      title: "Download started",
      position: "top-right",
      duration: 10000,
      status: "loading",
    });
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
      <Heading fontSize={["4xl", "4xl"]}>See Rating</Heading>
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
        <Text fontSize={"sm"}>{upToDateRating}</Text>
      </HStack>
      <Button w="100%" colorScheme={"teal"} onClick={handleDownloadBtnClick}>
        Download
      </Button>
    </VStack>
  );
};

export default PurchasedRatingCard;
