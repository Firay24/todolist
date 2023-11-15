// import library used
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// import icons from react-icons
import { SlArrowLeft } from "react-icons/sl";

// import global style
import {
  backgroundColorHover,
  backgroundContainer,
  primaryTextColor,
} from "../styles";

const ButtonBack = () => {
  const navigate = useNavigate();
  return (
    <Button
      backgroundColor={backgroundContainer()}
      _hover={{ backgroundColor: backgroundColorHover() }}
      color={primaryTextColor()}
      onClick={() => navigate(-1)}
    >
      <SlArrowLeft />
    </Button>
  );
};

export default ButtonBack;
