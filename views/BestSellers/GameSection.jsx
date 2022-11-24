import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  UnorderedList,
  useBreakpointValue,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";
import GameCard from "../../components/Cards/GameCard";
import LoadingGameCard from "../../components/Cards/LoadingGameCard";

const settings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 1,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 786,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        // initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
  ],
};

const GamesSection = ({ sectionTitle, fetchFunction }) => {
  const ref = useRef(null);
  useScroll({ container: ref });

  const [games, setGames] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setGames(fetchFunction());
    setTimeout(() => setLoading(false), 1000);
  }, [fetchFunction]);

  return (
    <VStack w="100%" px={0} as={"section"} spacing={5} alignItems="start">
      <Heading
        w="100%"
        size={["2xl"]}
        textAlign={["center", "center", "start"]}>
        {sectionTitle}
      </Heading>

      <ul
        ref={ref}
        >
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
      </ul>
    </VStack>
  );
};

export default GamesSection;
