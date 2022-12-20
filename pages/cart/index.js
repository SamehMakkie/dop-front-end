import {
  Center,
  GridItem,
  Heading,
  Show,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import getCartItems from "../../services/getCartItems";
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



const Cart = () => {
  const user = useSelector((state) => state.userReducer.value);
  
  const [games, setGames] = useState([])
  const [fetchAgain, setFetchAgain] = useState(false)
  
  const calculateTotalPrice = () => {
    let total = 0;
    games.map((game) => (total += Number(game.game_price)));
    return total;
  };
  
  const total = calculateTotalPrice();

  useEffect(() => {
    async function fetchCartItems() {
      if (user) {
        const {code, msg, data} = await getCartItems(user.id)
        if (code >= 0) {
          setGames(data)
        }
      }

    }
    fetchCartItems()
  },  [fetchAgain])

  return (
    <NavigationWrapper>
      <ProtectedRoute>
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
              <CartTable list={games} total={total} setFetchAgain={setFetchAgain} />
            </GridItem>
            <GridItem w="100%" colSpan={1}>
              <Center>
                <CartSummary gameIds={games.map(game => game.game_ıd)} sum={total} tax={3} />
              </Center>
            </GridItem>
          </SimpleGrid>
        </VStack>
      </ProtectedRoute>
    </NavigationWrapper>
  );
};

export default Cart;
