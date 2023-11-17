// import library used
import { Button } from "@chakra-ui/react";

// import global style
import {
  backgroundColorButton,
  backgroundContainer,
  backgroundContainer2,
  primaryTextColor,
} from "@/components/styles";

const ButtonComponent = (props: {
  title: string;
  onClick?: boolean;
  position?: string;
  handlerClick?: any;
}) => {
  return (
    <Button
      onClick={props.handlerClick}
      size={"sm"}
      width="full"
      fontWeight={"medium"}
      backgroundColor={
        props.onClick ? backgroundColorButton() : backgroundContainer()
      }
      variant={"unstyled"}
      color={props.onClick ? "white" : primaryTextColor()}
      rounded={"none"}
      roundedLeft={props.position === "left" ? "md" : undefined}
      roundedRight={props.position === "right" ? "md" : undefined}
      borderColor={!onclick ? "gray.400" : backgroundContainer2()}
    >
      {props.title}
    </Button>
  );
};

export default ButtonComponent;
