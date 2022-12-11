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
import { useState } from "react";
import FilterStack from "../../components/FilterStack/FilterStack";

const categories = ["Action", "Adventure", "FPS", "Strategy"];

const Filter = () => {
  const router = useRouter();
  const [maxPrice, setMaxPrice] = useState(250);
  const [minAge, setMinAge] = useState(5);
  const [selectedCategories, setSelectedCategories] = useState([]);

  console.log(router.query);
  console.log(selectedCategories)

  const handleCheckBoxChange = (e) => {
    const value = e.target.value;
    const index = selectedCategories.toString().indexOf(value);
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
  };

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
          //   colorScheme={"teal"}
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
      <FilterStack>
        <Heading size="md">Category</Heading>
        <CheckboxGroup colorScheme={"teal"} defaultValue={selectedCategories}>
          <VStack w="100%" pl={10} py={3} spacing={5}>
            {categories.map((category, i) => (
              <Checkbox
                key={i}
                w="100%"
                borderRadius={"2xl"}
                value={category.toLowerCase()}
                onChange={handleCheckBoxChange}>
                {category}
              </Checkbox>
            ))}
          </VStack>
        </CheckboxGroup>
      </FilterStack>
      <FilterStack>
        <Heading size="md">Age Restriction</Heading>
        <Slider
          min={5}
          max={18}
          defaultValue={5}
          aria-label="min-age"
          //   colorScheme={"teal"}
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
        <Button colorScheme={"teal"}>Apply</Button>
      </VStack>
    </VStack>
  );
};

export default Filter;
