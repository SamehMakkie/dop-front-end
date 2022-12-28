import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { Search2Icon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useRouter } from "next/router";

const SearchElement = () => {
  const [searchString, setSearchString] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  const handleClear = () => {
    setSearchString("");
  };

  const handleSearch = () => {
    // Replace multiple spaces with a single one
    let searchTerm = searchString.replace(/\s\s+/g, " ");
    searchTerm = searchString.replace(/[^a-zA-Z ]/g, "");

    if (searchTerm == "" || searchTerm == " ") {
      router.push("/search?categories=%5B%5D&genre_ids=&maxPrice=70&minAge=3");
    } else {
      searchTerm = searchTerm.trim();
      // Replace a space with a '-' character and convert the string to lower case
      searchTerm = searchTerm.replace(/\s+/g, "-").toLowerCase();
      router.push({pathname: "/search/", query: {slang: searchTerm, page: 1, genre_ids: ""}});
    }
  };

  return (
    <InputGroup>
      <InputLeftElement h="100%" cursor={"pointer"} onClick={handleSearch}>
        <Search2Icon />
      </InputLeftElement>
      <Input
        size={"lg"}
        variant="filled"
        onChange={handleChange}
        onKeyDown={(e) => {
          e.key == "Enter" && handleSearch();
        }}
        value={searchString}
        placeholder="Search..."
      />
      {searchString && (
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
