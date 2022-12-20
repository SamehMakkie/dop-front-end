import {
  Button,
  Checkbox,
  CheckboxGroup,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import FilterStack from "../../components/FilterStack/FilterStack";

const categories = [
  "Action",
  "Adventure",
  "Role-Playing",
  "Simulation",
  "Strategy",
  "Sports & Racing",
];

// Function that checks if the target the array arr contains the target array
const isInArray = (arr, target) => target.every((v) => arr.includes(v));

const Filter = ({ query }) => {
  const [maxPrice, setMaxPrice] = useState(250);
  const [minAge, setMinAge] = useState(5);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const router = useRouter();

  const handleCheckBoxChange = (e) => {
    const value = e.target.value;
    const index = selectedCategories?.toString().indexOf(value);

    // if (selectedCategories) {
    if (index > -1) {
      // Remove category from the array
      setSelectedCategories(
        selectedCategories.filter(
          (selectedCategory) => selectedCategory !== value
        )
      );
    } else {
      // Add category to the array
      let temp = [...selectedCategories, value.toString()];
      setSelectedCategories(temp);
    }
    // }
  };

  // // takes the categories query from link
  // useEffect(() => {
  //   const categoriesString = query.categories;
  //   if (categoriesString) {
  //     const firstChar = Array.from(categoriesString)[0];
  //     const lastChar =
  //       Array.from(categoriesString)[categoriesString.length - 1];

  //     if (firstChar == "[" && lastChar == "]") {
  //       const categoriesWithoutBrackets = categoriesString.slice(
  //         1,
  //         categoriesString.length - 1
  //       );
  //       const queryCategories = categoriesWithoutBrackets
  //         .split(",")
  //         .map((string) => string.toLowerCase());
  //       const lowerCaseCategories = categories.map((string) =>
  //         string.toLowerCase()
  //       );

  //       if (isInArray(lowerCaseCategories, queryCategories)) {
  //         setSelectedCategories(queryCategories);
  //       }
  //     }
  //   }
  // }, [query]);

  const apply = () => {
    let genreIdsString = "";
    
    // if (selectedCategories) {
    const tempSelectedCategories = selectedCategories?.filter(
      (category) => category != ""
    );

    for (let i = 0; i < tempSelectedCategories?.length; ++i) {
      genreIdsString += tempSelectedCategories[i] + "#";
    }

    const textCategories = tempSelectedCategories?.map(
      (id) => categories[id - 1]
    );
    let queryCategoriesString = "";
    for (let i = 0; i < textCategories?.length; i++) {
      queryCategoriesString += textCategories[i];
      if (i != textCategories.length - 1) {
        queryCategoriesString += ",";
      }
    }
    queryCategoriesString = "[" + queryCategoriesString + "]";
    queryCategoriesString = queryCategoriesString.toLowerCase();

    const newQuery = {
      categories: queryCategoriesString,
      genre_ids: genreIdsString,
      maxPrice,
      minAge,
    };

    router.push({ pathname: "/search", query: newQuery });
    // }
  };

  useEffect(() => {
    const genreIds = query.genre_ids?.split("#");
    async function AsyncSet() {
      await setSelectedCategories(genreIds);
    }
    AsyncSet;
  }, [query]);

  return (
    <VStack
      w="100%"
      px={8}
      py={10}
      alignItems="start"
      spacing={3}
      borderWidth={"2px"}
      borderRadius="2xl">
      <Heading>Filter</Heading>
      <FilterStack>
        <Heading size={"md"}>Price</Heading>
        <Slider
          min={0}
          max={250}
          defaultValue={250}
          aria-label="max-price"
          colorScheme={"teal"}
          onChange={(val) => setMaxPrice(val)}>
          <SliderMark
            value={maxPrice}
            textAlign="center"
            bg="teal.500"
            color="white"
            borderRadius={"lg"}
            mt="-10"
            ml="-5"
            w="12">
            {" "}
            {"$" + maxPrice}
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FilterStack>
      <VStack w="100%" spacing={5} alignItems="start">
        <Heading size="md">Category</Heading>
        <CheckboxGroup colorScheme={"teal"} value={selectedCategories}>
          <VStack w="100%" pl={5} spacing={5}>
            {categories.map((category, i) => (
              <Checkbox
                key={i}
                w="100%"
                borderRadius={"2xl"}
                value={(i + 1).toString()}
                onChange={handleCheckBoxChange}>
                {category}
              </Checkbox>
            ))}
          </VStack>
        </CheckboxGroup>
      </VStack>
      <FilterStack>
        <Heading size="md">Age Restriction</Heading>
        <Slider
          min={5}
          max={21}
          defaultValue={5}
          aria-label="min-age"
          colorScheme={"teal"}
          onChange={(val) => setMinAge(val)}>
          <SliderMark
            value={minAge}
            textAlign="center"
            bg="teal.500"
            color="white"
            borderRadius={"lg"}
            mt="-10"
            ml="-5"
            w="12">
            {" "}
            {minAge + "+"}
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FilterStack>
      <VStack pt={3} alignItems="start">
        <Button colorScheme={"teal"} onClick={apply}>
          Apply
        </Button>
      </VStack>
    </VStack>
  );
};

export default Filter;
