import { VStack } from "@chakra-ui/react";
import GamesSection from "../views/BestSellers/GameSection";
import Carousel from "../views/Carousel/Carousel";
import NavBar from "../views/NavBar/NavBar";

export default function Home() {
  function fetchBestSellerGames() {
    return [
      {
        link: "https://google.com",
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
    ];
  }

  return (
    <div>
      <NavBar />
      <VStack w="100%" spacing={20}>
        <Carousel />
        <GamesSection
          sectionTitle={"Best Sellers"}
          fetchFunction={fetchBestSellerGames}
        />
      </VStack>
    </div>
  );
}
