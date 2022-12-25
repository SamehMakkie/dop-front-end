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
  const [maxPrice, setMaxPrice] = useState(70);
  const [minAge, setMinAge] = useState(3);
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
      let temp = (selectedCategories || []).concat(value.toString());
      setSelectedCategories(temp);
    }
    // }
  };

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
    async function AsyncSet() {
      const genreIds = query.genre_ids?.split("#");
      await setSelectedCategories(genreIds);
    }
    AsyncSet();
  }, [query]);

  if (!query) {
    return;
  }

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
          max={70}
          defaultValue={70}
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
          min={3}
          max={21}
          defaultValue={3}
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
