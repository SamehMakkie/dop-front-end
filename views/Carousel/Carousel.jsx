import React, { useState } from "react";
import { Box, Flex, Button, Image, Icon } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "next/link";
import { useRouter } from "next/router";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const MotionFlex = motion(Flex);
const MotionImage = motion(Image);

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;

const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const getAnimation = (page, direction, i, prevPage) => {
  if (i == page) {
    return direction === 1 ? ["100%", "0%"] : ["-100%", "0%"];
  } else if (i == prevPage) {
    return direction === 1 ? ["0%", "-100%"] : ["0%", "100%"];
  }
};

const Carousel = ({ items }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [prevPage, setPrevPage] = useState(0);
  const router = useRouter();

  if (!items) {
    return null;
  }

  const paginate = (newDirection) => {
    setPrevPage(page);
    setPage([
      (page + newDirection + items.length) % items.length,
      newDirection,
    ]);
  };

  const handleOnDragEnd = (e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      paginate(-1);
    } else if (e.key === "ArrowRight") {
      paginate(1);
    }
  };

  return (
    <Box
      w="100%"
      as="section"
      position={"relative"}
      mb={10}
      tabIndex={0}
      onKeyDown={handleKeyDown}>
      <Flex align="center" justify="center" w="100%">
        <AnimatePresence  custom={direction}>
          {items?.map((item, index) => (
            <MotionFlex
              key={index}
              w="100%"
              custom={direction}
              alignItems="center"
              justifyContent="center"
              overflow={"scroll"}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              display={index === page ? "block" : "none"}>
              <MotionImage
                animate={{ x: getAnimation(page, direction, index, prevPage) }}
                transition={{ duration: 0.2 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleOnDragEnd}
                src={item.image}
                alt={item.image}
                w="100%"
                h="100%"
                objectFit="cover"
                cursor={"pointer"}
                onMouseUp={() => item.link && router.push(item.link)}
              />
            </MotionFlex>
          ))}
        </AnimatePresence>
      </Flex>
      <Button
        rounded={"full"}
        bgColor={["secondary", "white"]}
        color={["white", "secondary"]}
        top={[null, "calc(50% - 20px)"]}
        bottom={["-30px", null]}
        left="50px"
        position="absolute"
        w="40px"
        h="40px"
        zIndex={2}
        onClick={() => paginate(-1)}>
        <Icon as={ChevronLeftIcon} />
      </Button>
      <Button
        rounded={"full"}
        bgColor={["secondary", "white"]}
        color={["white", "secondary"]}
        top={[null, "calc(50% - 20px)"]}
        bottom={["-30px", null]}
        position="absolute"
        right={"50px"}
        w="40px"
        h="40px"
        zIndex={2}
        onClick={() => paginate(1)}>
        <Icon as={ChevronRightIcon} />
      </Button>
      <Box mt={4}>
        <Flex
          position={"relative"}
          bottom={["-3", "10", "20"]}
          zIndex={3}
          justify="center">
          {items.map((item, index) => (
            <Box
              key={index}
              w="8px"
              h="8px"
              mx="2px"
              bg={index === page ? "primary" : "gray.300"}
              borderRadius="full"
            />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default Carousel;
