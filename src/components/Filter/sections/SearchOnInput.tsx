// import library used
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

// import global stle
import { backgroundContainer, backgroundContainer2 } from "@/components/styles";

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
        borderColor={backgroundContainer2()}
        onChange={(e) => props.sendValue(e.target.value)}
      />
    </InputGroup>
  );
};

export default SearchOnInput;
