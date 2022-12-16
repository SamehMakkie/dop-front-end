import { Heading, HStack, Show, Stack, Text, VStack } from "@chakra-ui/react";
import GameActionCard from "../../components/Cards/GameActionCard";
import Carousel from "../../views/Carousel/Carousel";
import GameComments from "../../views/GameComments/GameComments";
import NavigationWrapper from "../../views/NavigationWrapper/NavigationWrapper";

const images = [
  {
    link: "",
    image: "https://images7.alphacoders.com/115/1151164.jpg",
  },

  {
    link: "",
    image: "https://cdn.mos.cms.futurecdn.net/62ryjABuyifaRQnsbKhhGD.jpg",
  },
  {
    link: "",
    image:
      "https://www.gamespot.com/a/uploads/screen_kubrick/1574/15746725/3843530-bfgp_v8.jpg",
  },
];

const gameInfo = {
  name: "Battlefield 2042",
  price: "$49",
  isPurchased: false,
  images,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  ageRestriction: 12,
  categories: ["Action", "Adventure"],
  developer: "DICE",
  publisher: "Electronic arts",
  releaseDate: "6 October 2021",
  sysReq: {
    min: {
      os: "windows 7",
      cpu: "i7-930 + FX-6390",
      gpu: "RTX 2060 | RX 5600",
      ram: "8GB",
      directX: "11",
      storage: 10,
    },
    recommended: {
      os: "windows 11",
      cpu: "i7-10090k + Ryzen 5700x",
      gpu: "RTX 3080 | RX 6700xt",
      ram: "16GB",
      directX: "11",
      storage: 50,
    },
  },
};

const GamePage = () => {
  return (
    <NavigationWrapper>
      <VStack w={"100%"} px={[0, 10, 10, 20]} py={15} spacing={5}>
        <Heading w="100%" px={[8, 0]}>
          Battlelfield 2042
        </Heading>
        <Carousel cards={gameInfo.images} />
        <Stack
          w="100%"
          px={[8, 0]}
          justifyContent={"space-between"}
          direction={{ base: "column", md: "row" }}
          spacing={8}>
          <VStack
            w={["100%", "100%", "65%", "55%"]}
            maxW={{ md: "700px" }}
            lineHeight={"200%"}>
            <Text w="100%">{gameInfo.description}</Text>
            <br />
            <Text w="100%">
              <Text as="span" fontWeight={"bold"}>
                Age Restriction:{" "}
              </Text>{" "}
              {gameInfo.ageRestriction + "+"}
            </Text>
            <Text w="100%">
              <Text as="span" fontWeight={"bold"}>
                Developer:{" "}
              </Text>{" "}
              {gameInfo.developer}
            </Text>
            <Text w="100%">
              <Text as="span" fontWeight={"bold"}>
                Publisher:{" "}
              </Text>{" "}
              {gameInfo.publisher}
            </Text>
            <Text w="100%">
              <Text as="span" fontWeight={"bold"}>
                Release date:{" "}
              </Text>{" "}
              {gameInfo.releaseDate}
            </Text>

            <Text w="100%">
              <Text as="span" fontWeight={"bold"}>
                Categories:{" "}
              </Text>
              {gameInfo.categories.map((category, i) => {
                if (gameInfo.categories.length - 1 == i) {
                  return `${category}`;
                }
                return `${category}, `;
              })}
            </Text>
            <VStack w="100%" spacing={8} pt={5}>
              <Heading w="100%" size={"md"}>
                System requirements
              </Heading>
              <Stack w="100%" direction={["column", "row"]} spacing={5}>
                <VStack w="50%" alignItems={"start"}>
                  <Text fontWeight={"bold"}>Minimum</Text>
                  <Text>OS: {gameInfo.sysReq.min.os}</Text>
                  <Text>CPU: {gameInfo.sysReq.min.cpu}</Text>
                  <Text>GPU: {gameInfo.sysReq.min.gpu}</Text>
                  <Text>RAM: {gameInfo.sysReq.min.ram}</Text>
                  <Text>DirectX: {gameInfo.sysReq.min.directX}</Text>
                  <Text>Storage: {gameInfo.sysReq.min.storage}</Text>
                </VStack>
                <VStack w="50%" alignItems={"start"}>
                  <Text fontWeight={"bold"}>Minimum</Text>
                  <Text>OS: {gameInfo.sysReq.min.os}</Text>
                  <Text>CPU: {gameInfo.sysReq.min.cpu}</Text>
                  <Text>GPU: {gameInfo.sysReq.min.gpu}</Text>
                  <Text>RAM: {gameInfo.sysReq.min.ram}</Text>
                  <Text>DirectX: {gameInfo.sysReq.min.directX}</Text>
                  <Text>Storage: {gameInfo.sysReq.min.storage}</Text>
                </VStack>
              </Stack>
            </VStack>
          </VStack>
          <GameActionCard isPurchased={gameInfo.isPurchased} price={gameInfo.price} />
        </Stack>
        <GameComments isPurchased={gameInfo.isPurchased} />
      </VStack>
    </NavigationWrapper>
  );
};

export default GamePage;
