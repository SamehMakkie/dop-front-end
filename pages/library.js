import {
  Center,
  GridItem,
  Heading,
  Hide,
  Show,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LibraryGameCard from "../components/Cards/LibraryGameCard";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import fetchLibrary from "../services/fetchLibrary";
import NavigationWrapper from "../views/NavigationWrapper/NavigationWrapper";

function fetchLibraryGames() {
  return [
    {
      link: "/games/123",
      src: "https://i.pinimg.com/736x/57/b1/f7/57b1f746879ac3d9038b24fe2b00c1f2--advanced-warfare-infinite.jpg",
      name: "Call of Duty Infinite Warfare",
      rating: 4.3,
    },
    {
      link: "/games/123",
      src: "https://www.mobygames.com/images/covers/l/518449-forza-horizon-4-windows-apps-front-cover.png",
      name: "Froza Horizon 4",
      rating: 3.3,
    },
    {
      link: "/games/123",
      src: "https://i.pinimg.com/564x/5b/52/4d/5b524dcc589c3a9f0098884c2ff21d32.jpg",
      name: "Fortnite",
      rating: 4.8,
    },
    {
      link: "/games/123",
      src: "https://imageio.forbes.com/specials-images/imageserve/60bcfa09d11d950822064c05/Battlefield-V-cover-art/960x0.jpg?height=600&width=426&fit=bounds",
      name: "Battlefield V",
      rating: 3,
    },
    {
      link: "/games/123",
      src: "https://i.pinimg.com/736x/57/b1/f7/57b1f746879ac3d9038b24fe2b00c1f2--advanced-warfare-infinite.jpg",
      name: "Call of Duty Infinite Warfare",
      rating: 4.3,
    },
    {
      link: "/games/123",
      src: "https://www.mobygames.com/images/covers/l/518449-forza-horizon-4-windows-apps-front-cover.png",
      name: "Froza Horizon 4",
      rating: 3.3,
    },
    {
      link: "/games/123",
      src: "https://i.pinimg.com/564x/5b/52/4d/5b524dcc589c3a9f0098884c2ff21d32.jpg",
      name: "Fortnite",
      rating: 4.8,
    },
    {
      link: "/games/123",
      src: "https://imageio.forbes.com/specials-images/imageserve/60bcfa09d11d950822064c05/Battlefield-V-cover-art/960x0.jpg?height=600&width=426&fit=bounds",
      name: "Battlefield V",
      rating: 3,
    },
  ];
}

const apiLink = "http://194.27.78.83/dop/";

const Library = () => {
  const user = useSelector((state) => state.userReducer.value);
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function getGames() {
      if (user) {
        const { code, msg, data } = await fetchLibrary(user.id);

        setGames(data);
      }
    }
    getGames();
  }, []);

  return (
    <NavigationWrapper>
      <ProtectedRoute>
        <VStack
          w="100%"
          px={[5, 10, 10, 32, 36]}
          py={20}
          minH="60vh"
          spacing={5}
          justifyContent="start">
          <Heading w="100%" textAlign={{ base: "center", md: "start" }}>
            Library
          </Heading>
          {games.length == 0 && (
            <Text w="100%" fontSize={"lg"} textAlign={{ base: "center", md: "start" }}>
              You don{"'"}t have any games yet
            </Text>
          )}
          <SimpleGrid w="100%" columns={[1, 2, 3, 4]}>
            {games.map((game, i) => (
              <GridItem key={i} w="100%" colSpan={1}>
                <Hide above="md">
                  <Center>
                    <LibraryGameCard
                      link={game.game_ıd}
                      src={apiLink + game.game_picture}
                      name={game.game_name}
                      rating={game.game_rating}
                    />
                  </Center>
                </Hide>
                <Show above="md">
                  <LibraryGameCard
                    link={game.game_ıd}
                    src={apiLink + game.game_picture}
                    name={game.game_name}
                    rating={game.game_rating}
                  />
                </Show>
              </GridItem>
            ))}
          </SimpleGrid>
        </VStack>
      </ProtectedRoute>
    </NavigationWrapper>
  );
};

export default Library;
