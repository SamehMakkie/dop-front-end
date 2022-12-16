import {
  Center,
  GridItem,
  Heading,
  Show,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import CartSummary from "../../views/CartViews/CartSummary";
import CartTable from "../../views/CartViews/CartTable";
import NavigationWrapper from "../../views/NavigationWrapper/NavigationWrapper";

function fetchCartGames() {
  return [
    {
      link: "/games/123",
      src: "https://i.pinimg.com/736x/57/b1/f7/57b1f746879ac3d9038b24fe2b00c1f2--advanced-warfare-infinite.jpg",
      name: "Call of Duty Infinite Warfare",
      rating: 4.3,
      price: "$49",
    },
    {
      link: "/games/123",
      src: "https://www.mobygames.com/images/covers/l/518449-forza-horizon-4-windows-apps-front-cover.png",
      name: "Froza Horizon 4",
      rating: 3.3,
      price: "$49",
    },
    {
      link: "/games/123",
      src: "https://i.pinimg.com/564x/5b/52/4d/5b524dcc589c3a9f0098884c2ff21d32.jpg",
      name: "Fortnite",
      rating: 4.8,
      price: "$49",
    },
  ];
}

const calculateTotalPrice = () => {
  let total = 0;
  fetchCartGames().map((game) => (total += Number(game.price.slice(1))));
  return total;
};

const Cart = () => {
  const total = calculateTotalPrice();
  return (
    <NavigationWrapper>
      <VStack
        w="100%"
        px={[5, 10, 10, 32, 36]}
        py={20}
        spacing={5}
        justifyContent="center">
        <Heading w="100%">Cart</Heading>
        <SimpleGrid
          w="100%"
          columns={{ base: 1, lg: 3 }}
          columnGap={5}
          rowGap={20}>
          <GridItem w="100%" colSpan={{ base: 1, lg: 2 }}>
            <CartTable list={fetchCartGames()} total={total} />
          </GridItem>
          <GridItem w="100%" colSpan={1}>
              <Center>
                <CartSummary sum={total} tax={50} />
              </Center>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </NavigationWrapper>
  );
};

export default Cart;
