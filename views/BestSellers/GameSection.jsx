import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  Hide,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import { useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import GameCard from "../../components/Cards/GameCard";
import LoadingGameCard from "../../components/Cards/LoadingGameCard";

const GamesSection = ({ i, sectionTitle, fetchFunction }) => {
  const [games, setGames] = useState();
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  useScroll({ container: ref });

  const slideLeft = () => {
    var slider = document.getElementById("slider-" + i);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider-" + i);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  useEffect(() => {
    setGames(fetchFunction());
    setTimeout(() => setLoading(false), 1000);
  }, [fetchFunction]);

  return (
    <VStack w="100%" px={0} as={"section"} spacing={5} alignItems="start">
      <Heading
        w="100%"
        pl={{base: 0, md: 2, lg: 14}}
        size={["2xl"]}
        textAlign={["center", "center", "start"]}>
        {sectionTitle}
      </Heading>
      <Flex
        w="100%"
        h="100%"
        ref={ref}
        position={"relative"}
        alignItems="center"
        whiteSpace={"nowrap"}
        scrollBehavior={"smooth"}>
        <Hide below="lg">
          <IconButton as={ChevronLeftIcon} onClick={slideLeft} mr={2} cursor={"pointer"} />
        </Hide>
        <Box
          id={`slider-${i}`}
          w="100%"
          h="100%"
          overflowX={"scroll"}
          overflowY="hidden"
          scrollBehavior={"smooth"}
          py={5}
          px={[0, 3]}
          mx="auto">
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
        </Box>
        <Hide below="lg">
          <IconButton as={ChevronRightIcon} onClick={slideRight} ml={2} cursor={"pointer"} />
        </Hide>
      </Flex>
    </VStack>
  );
};

export default GamesSection;
