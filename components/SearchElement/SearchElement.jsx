import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { Search2Icon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";

const SearchElement = () => {
  const [searchString, setSearchString] = useState("");

  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  const handleClear = () => {
    setSearchString("");
  };

  const handleSearch = () => {
    console.log(searchString);
  };

  return (
    <InputGroup>
      <InputLeftElement h="100%" cursor={"pointer"} onClick={handleSearch}>
        <Search2Icon />
      </InputLeftElement>
      <Input
        size={"lg"}
        variant="filled"
        fontSize={"md"}
        onChange={handleChange}
        onKeyDown={(e) => {
          e.key == "Enter" && handleSearch();
        }}
        value={searchString}
        placeholder="Search..."
      />
      { searchString && (
        <InputRightElement
          h="100%"
          pr={4}
          cursor={"pointer"}
          onClick={handleClear}>
          <CloseIcon boxSize={"14px"} />
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default SearchElement;
