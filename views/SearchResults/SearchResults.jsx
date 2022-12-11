import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  HStack,
  IconButton,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import GameCard from "../../components/Cards/GameCard";

function fetchDumbData() {
  return [
    {
      link: "",
      src: "https://i.pinimg.com/736x/57/b1/f7/57b1f746879ac3d9038b24fe2b00c1f2--advanced-warfare-infinite.jpg",
      name: "Call of Duty Infinite Warfare",
      rating: 4.3,
      price: "$49",
    },
    {
      link: "",
      src: "https://www.mobygames.com/images/covers/l/518449-forza-horizon-4-windows-apps-front-cover.png",
      name: "Froza Horizon 4",
      rating: 3.3,
      price: "$49",
    },
    {
      link: "",
      src: "https://i.pinimg.com/564x/5b/52/4d/5b524dcc589c3a9f0098884c2ff21d32.jpg",
      name: "Fortnite",
      rating: 4.8,
      price: "$49",
    },
    {
      link: "",
      src: "https://imageio.forbes.com/specials-images/imageserve/60bcfa09d11d950822064c05/Battlefield-V-cover-art/960x0.jpg?height=600&width=426&fit=bounds",
      name: "Battlefield V",
      rating: 3,
      price: "$49",
    },
    {
      link: "",
      src: "https://i.pinimg.com/736x/57/b1/f7/57b1f746879ac3d9038b24fe2b00c1f2--advanced-warfare-infinite.jpg",
      name: "Call of Duty Infinite Warfare",
      rating: 4.3,
      price: "$49",
    },
    {
      link: "",
      src: "https://www.mobygames.com/images/covers/l/518449-forza-horizon-4-windows-apps-front-cover.png",
      name: "Froza Horizon 4",
      rating: 3.3,
      price: "$49",
    },
    {
      link: "",
      src: "https://i.pinimg.com/564x/5b/52/4d/5b524dcc589c3a9f0098884c2ff21d32.jpg",
      name: "Fortnite",
      rating: 4.8,
      price: "$49",
    },
    {
      link: "",
      src: "https://imageio.forbes.com/specials-images/imageserve/60bcfa09d11d950822064c05/Battlefield-V-cover-art/960x0.jpg?height=600&width=426&fit=bounds",
      name: "Battlefield V",
      rating: 3,
      price: "$49",
    },
    {
      link: "",
      src: "https://i.pinimg.com/736x/57/b1/f7/57b1f746879ac3d9038b24fe2b00c1f2--advanced-warfare-infinite.jpg",
      name: "Call of Duty Infinite Warfare",
      rating: 4.3,
      price: "$49",
    },
  ];
}

const SearchResults = () => {
  return (
    <VStack w="100%" px={5} spacing={3} alignItems="start">
      <BreadCrumb />
      <Heading as="h1">Results</Heading>
      <SimpleGrid w="100%" columns={[1, 2, 2, 3]}>
        {fetchDumbData().map((game) => (
          <GameCard key={game} {...game} />
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default SearchResults;
