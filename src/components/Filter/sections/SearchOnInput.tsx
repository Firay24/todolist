// import library used
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

// import global stle
import {
  backgroundContainer,
  borderColor,
  primaryTextColor,
} from "@/components/styles";

// import icons from react-icons
import { FiSearch } from "react-icons/fi";

const SearchOnInput = (props: { sendValue: any }) => {
  return (
    <InputGroup size="sm">
      <InputLeftElement color={"gray.400"}>
        <FiSearch />
      </InputLeftElement>
      <Input
        backgroundColor={backgroundContainer()}
        rounded={"full"}
        placeholder="search"
        borderColor={borderColor()}
        onChange={(e) => props.sendValue(e.target.value)}
        color={primaryTextColor()}
      />
    </InputGroup>
  );
};

export default SearchOnInput;
