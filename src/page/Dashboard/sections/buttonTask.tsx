/* eslint-disable @typescript-eslint/no-explicit-any */
// import library used
import { Button, Text } from "@chakra-ui/react";

// import style global from components folder
import {
  backgroundColorHover,
  backgroundContainer,
  primaryTextColor,
} from "@/components/styles";

// import icons from react-icons
import { AiOutlinePlus } from "react-icons/ai";

const ButtonTask = (props: { addButton: any }) => {
  return (
    <Button
      onClick={props.addButton}
      size={"sm"}
      border={"1px"}
      borderColor={"gray.400"}
      gap={3}
      backgroundColor={backgroundContainer()}
      _hover={{ backgroundColor: backgroundColorHover() }}
      color={primaryTextColor()}
    >
      <AiOutlinePlus />
      <Text fontWeight={"medium"}>Tasks</Text>
    </Button>
  );
};

export default ButtonTask;
