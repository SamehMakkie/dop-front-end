import { Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import GameCard from "../../components/Cards/GameCard";
import LoadingGameCard from "../../components/Cards/LoadingGameCard";

const GamesSection = ({ sectionTitle, fetchFunction }) => {
  const [games, setGames] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setGames(fetchFunction());
    setTimeout(() => setLoading(false), 1000);
  }, [fetchFunction]);

  return (
    <VStack w="100%" px={12} as={"section"} spacing={5} alignItems="start">
      <Heading size={["2xl"]}>Best Sellers</Heading>
      <SimpleGrid w="100%" columns={[1, 2, 3, 4]} columnGap={10} rowGap={10}>
        {loading
          ? [...Array(4)].map((e, i) => <LoadingGameCard key={i} />)
          : games.map((game, i) => (
              <GameCard
                key={i}
                src={game.src}
                name={game.name}
                rating={game.rating}
                price={game.price}
                link={game.link}
              />
            ))}
      </SimpleGrid>
    </VStack>
  );
};

export default GamesSection;
