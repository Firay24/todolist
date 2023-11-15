/* eslint-disable @typescript-eslint/no-explicit-any */

// import library used
import { HStack, Stack, Switch } from "@chakra-ui/react";
import { useContext } from "react";

// global state
import { ThemeContext } from "@/router";

// import icons from react-icons
import { BsFillMoonFill, BsMoon, BsSunFill, BsSun } from "react-icons/bs";
import { primaryTextColor } from "@/components/styles";

const ModeSwitch = () => {
  const theme: any = useContext(ThemeContext);
  return (
    <Stack paddingX={4} color={primaryTextColor()}>
      <HStack fontSize={"xs"}>
        {!theme.currentTheme ? <BsSunFill /> : <BsSun />}
        <Switch
          size={"sm"}
          isChecked={theme.currentTheme}
          onChange={theme.switchTheme}
        />
        {theme.currentTheme ? <BsFillMoonFill /> : <BsMoon />}
      </HStack>
    </Stack>
  );
};

export default ModeSwitch;
