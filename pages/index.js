import GamesSection from "../views/GameSection/GameSection";
import Categories from "../views/Categories/Categories";
import NavigationWrapper from "../views/NavigationWrapper/NavigationWrapper";
import PageStackSpacing from "../views/PageStackSpacing/PageStackSpacing";
import fetchMainPageData from "../services/fetchMainPageData";
import Carousel from "../views/Carousel/Carousel";

const carouselList = [
  {
    // Cyperpunk
    link: "/games/27",
    image: "/cyberPunk.png",
  },
  {
    // NBA
    link: "/games/41",
    image: "/NBA.jpeg",
  },
  {
    // Call of duty
    link: "/games/7",
    image: "/callOfDuty.png",
  },
];

function fetchCarouselImages() {
  return [
    {
      // Cyperpunk
      link: "/games/27",
      image: "/cyberPunk.png",
    },
    {
      // NBA
      link: "/games/41",
      image: "/NBA.jpeg",
    },
    {
      // Call of duty
      link: "/games/7",
      image: "/callOfDuty.png",
    },
    // {
    //   link: "/games/123",
    //   image:
    //     "https://wallpaperboat.com/wp-content/uploads/2020/11/16/61053/no-mans-sky-23.jpg",
    // },
  ];
}

export default function Home({ highestRated, bestSellers, recently_added }) {
  const gameSections = [
    {
      title: "Best Sellers",
      data: bestSellers,
    },
    {
      title: "Highest Rated",
      data: highestRated,
    },
    {
      title: "Recently Added",
      data: recently_added,
    },
  ];

  return (
    <NavigationWrapper>
      <Carousel items={carouselList} />
      {/* <Carousel cards={fetchCarouselImages()} /> */}
      <PageStackSpacing>
        {gameSections.map((section, i) => (
          <GamesSection
            key={i}
            i={i}
            sectionTitle={section.title}
            fetchFunction={section.data}
          />
        ))}
        <Categories sectionTitle={"Categories"} />
      </PageStackSpacing>
    </NavigationWrapper>
  );
}

export async function getServerSideProps() {
  const data = await fetchMainPageData();
  return {
    props: {
      highestRated: data.highest_rateds,
      bestSellers: data.top_sellers,
      recently_added: data.recently_added,
    },
  };
}
