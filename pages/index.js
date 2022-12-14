import { VStack } from "@chakra-ui/react";
import GamesSection from "../views/GameSection/GameSection";
import Carousel from "../views/Carousel/Carousel";
import Categories from "../views/Categories/Categories";
import Footer from "../views/Footer/Footer";
import NavBar from "../views/NavBar/NavBar";
import NavigationWrapper from "../views/NavigationWrapper/NavigationWrapper";

function fetchBestSellerGames() {
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
  ];
}

function fetchHighestRatedGames() {
  return [
    {
      link: "",
      src: "https://www.mobygames.com/images/covers/l/497174-minecraft-nintendo-switch-front-cover.jpg",
      name: "Minecraft",
      rating: 4.3,
      price: "$49",
    },
    {
      link: "",
      src: "https://i.pinimg.com/originals/d4/e7/a9/d4e7a9ae827ea781b705cc5e9dc01a8e.jpg",
      name: "Destiny",
      rating: 3.3,
      price: "$49",
    },
    {
      link: "",
      src: "https://www.mobygames.com/images/covers/l/538006-apex-legends-xbox-one-front-cover.jpg",
      name: "Apex Legend",
      rating: 4.8,
      price: "$49",
    },
    {
      link: "",
      src: "https://preview.redd.it/utps0v323r751.png?width=3840&format=png&auto=webp&s=a77715f1ef01a5a2bed61350b4d8c9f1008df7aa",
      name: "Valorant",
      rating: 3,
      price: "$49",
    },
    {
      link: "",
      src: "https://www.mobygames.com/images/covers/l/497174-minecraft-nintendo-switch-front-cover.jpg",
      name: "Minecraft",
      rating: 4.3,
      price: "$49",
    },
    {
      link: "",
      src: "https://i.pinimg.com/originals/d4/e7/a9/d4e7a9ae827ea781b705cc5e9dc01a8e.jpg",
      name: "Destiny",
      rating: 3.3,
      price: "$49",
    },
    {
      link: "",
      src: "https://www.mobygames.com/images/covers/l/538006-apex-legends-xbox-one-front-cover.jpg",
      name: "Apex Legend",
      rating: 4.8,
      price: "$49",
    },
    {
      link: "",
      src: "https://preview.redd.it/utps0v323r751.png?width=3840&format=png&auto=webp&s=a77715f1ef01a5a2bed61350b4d8c9f1008df7aa",
      name: "Valorant",
      rating: 3,
      price: "$49",
    },
  ];
}

function fetchRecentlyAddedGames() {
  return [
    {
      link: "",
      src: "https://www.cnet.com/a/img/resize/2b05dadb6d20f076c3c07aeebeaf5028b8b8fe75/hub/2019/11/21/19db7c73-c881-4bd4-bf96-8c2174feff67/box-art-flat.png?auto=webp&width=1200",
      name: "Half life Alyx V",
      rating: 3,
      price: "$49",
    },
    {
      link: "https://google.com",
      src: "https://www.mobygames.com/images/covers/l/700892-rocket-league-playstation-4-front-cover.png",
      name: "Rocket League",
      rating: 4.3,
      price: "$49",
    },
    {
      link: "",
      src: "https://www.mobygames.com/images/covers/l/567922-cyberpunk-2077-xbox-one-front-cover.jpg",
      name: "Cyberpunk 2077",
      rating: 3.3,
      price: "$49",
    },
    {
      link: "",
      src: "https://www.mobygames.com/images/covers/l/678796-microsoft-flight-simulator-windows-apps-front-cover.jpg",
      name: "Microsoft Flight Simulation",
      rating: 4.8,
      price: "$49",
    },
    {
      link: "",
      src: "https://www.cnet.com/a/img/resize/2b05dadb6d20f076c3c07aeebeaf5028b8b8fe75/hub/2019/11/21/19db7c73-c881-4bd4-bf96-8c2174feff67/box-art-flat.png?auto=webp&width=1200",
      name: "Half life Alyx V",
      rating: 3,
      price: "$49",
    },
    {
      link: "https://google.com",
      src: "https://www.mobygames.com/images/covers/l/700892-rocket-league-playstation-4-front-cover.png",
      name: "Rocket League",
      rating: 4.3,
      price: "$49",
    },
    {
      link: "",
      src: "https://www.mobygames.com/images/covers/l/567922-cyberpunk-2077-xbox-one-front-cover.jpg",
      name: "Cyberpunk 2077",
      rating: 3.3,
      price: "$49",
    },
    {
      link: "",
      src: "https://www.mobygames.com/images/covers/l/678796-microsoft-flight-simulator-windows-apps-front-cover.jpg",
      name: "Microsoft Flight Simulation",
      rating: 4.8,
      price: "$49",
    },
  ];
}

const gameSections = [
  {
    title: "Best Sellers",
    fetchFunction: fetchBestSellerGames,
  },
  {
    title: "Highest Rated",
    fetchFunction: fetchHighestRatedGames,
  },
  {
    title: "Recently Added",
    fetchFunction: fetchRecentlyAddedGames,
  },
];

export default function Home() {
  return (
    <NavigationWrapper>
      <Carousel />
      <VStack
        w="100%"
        px={[5, 10, 10, 32, 36]}
        pt={20}
        spacing={20}
        justifyContent="center">
        {gameSections.map((section, i) => (
          <GamesSection
            key={i}
            i={i}
            sectionTitle={section.title}
            fetchFunction={section.fetchFunction}
          />
        ))}
        <Categories sectionTitle={"Categories"} />
      </VStack>
    </NavigationWrapper>
  );
}
