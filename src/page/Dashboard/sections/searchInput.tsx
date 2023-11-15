/* eslint-disable @typescript-eslint/no-explicit-any */

// import library used
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

// import global style
import { backgroundContainer, backgroundContainer2 } from "@/components/styles";

// import icons from react-icons
import { FiSearch } from "react-icons/fi";

const SearchInput = (props: { sendValue: any }) => {
  return (
    <InputGroup size="sm">
      <InputLeftElement color={"gray.400"}>
        <FiSearch />
      </InputLeftElement>
      <Input
        backgroundColor={backgroundContainer()}
        rounded={"full"}
        placeholder="search"
        borderColor={backgroundContainer2()}
        onChange={(e) => props.sendValue(e.target.value)}
      />
    </InputGroup>
  );
};

export default SearchInput;
