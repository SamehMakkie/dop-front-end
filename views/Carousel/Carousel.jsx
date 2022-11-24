import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
import Slider from "react-slick";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Carousel() {
  const [slider, setSlider] = useState(null);

  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });

  const cards = [
    {
      link: "",
      image:
        "https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/hero/mw-wz/VGD-WZ-S2-POIS-TOUT.jpg",
    },
    {
      link: "",
      image:
        "https://www.gtplanet.net/wp-content/uploads/2021/08/ForzaHorizon5_KeyArt_Horiz_RGB_Final.jpg",
    },
    {
      link: "",
      image: "https://images7.alphacoders.com/115/1151164.jpg",
    },
    {
      link: "",
      image:
        "https://wallpaperboat.com/wp-content/uploads/2020/11/16/61053/no-mans-sky-23.jpg",
    },
  ];

  return (
    <Box position={"relative"} width={"full"} overflow={"hidden"}>
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        top={top}
        zIndex={2}
        left={side}
        variant="ghost"
        bgColor={"white"}
        position="absolute"
        as={ChevronLeftIcon}
        aria-label="left-arrow"
        transform={"translate(0%, -50%)"}
        onClick={() => slider?.slickPrev()} />
      {/* Right Icon */}
      <IconButton
        top={top}
        zIndex={2}
        right={side}
        variant="ghost"
        bgColor={"white"}
        position="absolute"
        as={ChevronRightIcon}
        aria-label="right-arrow"
        transform={"translate(0%, -50%)"}
        onClick={() => slider?.slickNext()} />
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Link key={index} href={card.link}>
            <Box
              height={["65vw", "60vw", "50vw"]}
              position="relative"
              objectFit={"cover"}
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundImage={`url(${card.image})`}></Box>
          </Link>
        ))}
      </Slider>
    </Box>
  );
}
