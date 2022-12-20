import { Heading, HStack, Show, Stack, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GameActionCard from "../../components/Cards/GameActionCard";
import fetchGameInfo from "../../services/fetchGameInfo";
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

const apiLink = "http://194.27.78.83/dop/";

const GamePage = () => {
  const user = useSelector((state) => state.userReducer.value);
  const [refresh, setRefresh] = useState(false)
  const [gameId, setGameId] = useState()
  const [data, setData] = useState();
  const router = useRouter();
  console.log(data);

  const getCarouseImages = () => {
    if (data) {
      const game_pictures = data.game_pictures;
      const temp = game_pictures.map((picture) => ({
        link: "",
        image: apiLink + picture.game_picture,
      }));
      return temp;
    }
    return;
  };

  useEffect(() => {
    async function fetchDetails() {
      const { id } = router.query;
      setGameId(id)

      if (id) {
        if (user) {
          const { data } = await fetchGameInfo(user.id, id);
          setData(data);
        } else {
          const { data } = await fetchGameInfo(0, id);
          setData(data);
        }
      }
    }
    fetchDetails();
  }, [router.query, refresh]);

  return (
    <NavigationWrapper>
      <VStack w={"100%"} px={[0, 10, 10, 20]} py={15} spacing={5}>
        <Heading w="100%" px={[8, 0]}>
          {data?.game_name}
        </Heading>
        <Carousel cards={getCarouseImages()} />
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
            <Text w="100%">{data?.game_description}</Text>
            <br />
            <Text w="100%">
              <Text as="span" fontWeight={"bold"}>
                Age Restriction:{" "}
              </Text>{" "}
              {data?.game_age_restriction + "+"}
            </Text>
            <Text w="100%">
              <Text as="span" fontWeight={"bold"}>
                Developer:{" "}
              </Text>{" "}
              {data?.game_developer}
            </Text>
            <Text w="100%">
              <Text as="span" fontWeight={"bold"}>
                Publisher:{" "}
              </Text>{" "}
              {data?.game_publisher}
            </Text>
            <Text w="100%">
              <Text as="span" fontWeight={"bold"}>
                Release date:{" "}
              </Text>{" "}
              {data?.game_release_date}
            </Text>

            <Text w="100%">
              <Text as="span" fontWeight={"bold"}>
                Categories:{" "}
              </Text>
              {data?.game_genre}
              {/* {gameInfo.categories.map((category, i) => {
                if (gameInfo.categories.length - 1 == i) {
                  return `${category}`;
                }
                return `${category}, `;
              })} */}
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
          <GameActionCard
            isPurchased={data?.download_visible}
            price={"$" + data?.game_price}
            rating={data?.game_rating}
            id={gameId}
          />
        </Stack>
        <GameComments gameId={gameId} comments={data?.game_comments} isPurchased={data?.download_visible} setRefresh={setRefresh} />
      </VStack>
    </NavigationWrapper>
  );
};

export default GamePage;
