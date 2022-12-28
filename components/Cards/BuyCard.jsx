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
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import addToCart from "../../services/addToCard";
import { setNumOfItems } from "../../redux/features/cartSlice";

const BuyCard = ({ gameId, price }) => {
  const user = useSelector((state) => state.userReducer.value);
  const numOfItemsInCart = useSelector((state) => state.cartReducer.value);
  const [rating, setRating] = useState(0);
  const router = useRouter();
  const array = [...Array(5).keys()];
  const toast = useToast();
  const dispatch = useDispatch();

  const handleBuyNow = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description:
          "You need to be signed in first before you can add to cart.",
        duration: 1500,
        isClosable: true,
        position: "top-right",
      });
      router.push("/signin");
    } else {
      // to be done later
      router.push({
        pathname: "/cart/checkout",
        query: {
          game_id: `${gameId}#`,
          total_price: price.slice(1),
          tax_percentage: 3,
        },
      });
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description:
          "You need to be signed in first before you can add to cart.",
        duration: 1500,
        isClosable: true,
        position: "top-right",
      });
      router.push("/signin");
    } else {
      const { code, msg } = await addToCart(user.id, gameId);

      if (code > 0) {
        dispatch(setNumOfItems(Number(numOfItemsInCart) + 1));
        toast({
          title: "Game added to cart",
          description: "Game has been successfully added to the cart.",
          duration: 5000,
          isClosable: true,
          status: "success",
          position: "top-right",
        });
        router.push(
          "/search?categories=%5B%5D&genre_ids=&maxPrice=70&minAge=3"
        );
      } else {
        toast({
          title: "Could not add",
          description: msg,
          duration: 5000,
          status: "error",
          position: "top-right",
        });
      }
    }
  };

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
      <Heading fontSize={["4xl", "4xl"]}>{price}</Heading>
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
      <Button
        w="100%"
        colorScheme={"teal"}
        variant="outline"
        onClick={handleAddToCart}>
        Add to Cart
      </Button>
      <Button w="100%" colorScheme={"teal"} onClick={handleBuyNow}>
        Buy now
      </Button>
    </VStack>
  );
};

export default BuyCard;
