import { Heading, VStack } from "@chakra-ui/react";
import Carousel from "../../views/Carousel/Carousel";
import NavigationWrapper from "../../views/NavigationWrapper/NavigationWrapper";

const images = [
  {
    link: "",
    image:
      "https://nmswp.azureedge.net/wp-content/uploads/2018/07/homepage-features-explore-768x432.jpg",
  },
  {
    link: "",
    image:
      "https://cdn.vox-cdn.com/thumbor/BjjgCsLtiRL8Ej3sOqlw-sFv2pw=/0x0:1921x1081/1200x800/filters:focal(808x388:1114x694)/cdn.vox-cdn.com/uploads/chorus_image/image/71446827/nms_frontiers_featured_9_1920w.0.jpg",
  },
  {
    link: "",
    image: "https://cdn.mos.cms.futurecdn.net/dwaSXskCthYLg7vHUzdFSG.jpg",
  },
  {
    link: "",
    image:
      "https://www.nme.com/wp-content/uploads/2022/10/No-Mans-Sky.jpg",
  },
];

const GamePage = () => {

  return (
    <NavigationWrapper>
      <VStack w={"100%"} px={[0, 10, 10, 20]} py={15} spacing={5}>
        <Heading w="100%" px={[5, 0]}>Battlelfield 2042</Heading>
        <Carousel cards={images} />
      </VStack>
    </NavigationWrapper>
  );
};

export default GamePage;
