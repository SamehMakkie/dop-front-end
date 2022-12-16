import {
  Center,
  GridItem,
  Heading,
  Hide,
  Show,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import LibraryGameCard from "../components/Cards/LibraryGameCard";
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

const Library = () => {
  return (
    <NavigationWrapper>
      <VStack
        w="100%"
        px={[5, 10, 10, 32, 36]}
        py={20}
        spacing={5}
        justifyContent="center">
        <Heading w="100%" textAlign={{ base: "center", md: "start" }}>
          Library
        </Heading>
        <SimpleGrid w="100%" columns={[1, 2, 3, 4]}>
          {fetchLibraryGames().map((game, i) => (
            <GridItem key={i} w="100%" colSpan={1}>
              <Hide above="md">
                <Center>
                  <LibraryGameCard {...game} />
                </Center>
              </Hide>
              <Show above="md">
                <LibraryGameCard {...game} />
              </Show>
            </GridItem>
          ))}
        </SimpleGrid>
      </VStack>
    </NavigationWrapper>
  );
};

export default Library;
