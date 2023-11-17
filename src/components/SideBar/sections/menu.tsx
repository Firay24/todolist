// import library used
import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

// import icons from react-icons
import { GoHome, GoProjectRoadmap, GoClock } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";

// import global state from components
import {
  backgroundColor,
  backgroundContainer2,
  primaryTextColor,
  secondaryColor,
} from "@/components/styles";

// import component used
import Categories from "./categories";
import { useSelector } from "react-redux";
import { countTask, selectTasks } from "@/redux/taskSlice";

const Menu = (props: { onCloseSidebar: any; isMobile: any }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const tasks = useSelector(selectTasks);
  const countTaskOnToday = countTask(tasks);

  // console.log(countTaskOnToday);
  return (
    <Stack>
      {/* heading sidebar */}
      <HStack>
        <Stack
          paddingX={4}
          paddingY={3}
          color={primaryTextColor()}
          marginBottom={0}
        >
          <Heading fontSize={"larger"}>Todo List App</Heading>
          <Text color={secondaryColor()}>Create your project list</Text>
        </Stack>
        <Spacer />
        {props.isMobile ? (
          <Button
            onClick={props.onCloseSidebar}
            variant={"unstyled"}
            color={primaryTextColor()}
          >
            <AiOutlineClose />
          </Button>
        ) : null}
      </HStack>

      {/* menu sections */}
      <Stack
        maxWidth={"90%"}
        paddingX={4}
        paddingY={2}
        gap={1}
        color={primaryTextColor()}
      >
        <Text color={secondaryColor()} fontSize={"14px"} fontWeight={"thin"}>
          Tasks
        </Text>
        <HStack
          backgroundColor={pathname === "/" ? backgroundColor() : undefined} // used background color if current page
          padding={2}
          rounded={"lg"}
          onClick={() => navigate("/")} // navigate page HStack onClick
          cursor={"pointer"}
          width={"full"}
        >
          <Stack fontSize={"18px"}>
            <GoHome />
          </Stack>
          <Text fontSize={"sm"}>Home</Text>
        </HStack>
        <HStack
          backgroundColor={
            pathname === "/today" ? backgroundColor() : undefined
          } // used background color if current page
          padding={2}
          rounded={"lg"}
          onClick={() => navigate("/today")} // navigate page HStack onClick
          cursor={"pointer"}
          width={"full"}
        >
          <Stack fontSize={"18px"}>
            <GoClock />
          </Stack>
          <Text fontSize={"sm"}>Today</Text>
          <Spacer />
          <Box
            bg="red.500"
            color="white"
            borderRadius="full"
            boxSize="20px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="xs">{countTaskOnToday}</Text>
          </Box>
        </HStack>
        <HStack
          backgroundColor={
            pathname === "/category" ? backgroundColor() : undefined
          }
          padding={2}
          rounded={"lg"}
          onClick={() => navigate("/category")}
          cursor={"pointer"}
          width={"full"}
        >
          <Stack fontSize={"18px"}>
            <GoProjectRoadmap />
          </Stack>
          <Text fontSize={"sm"}>Category</Text>
        </HStack>
      </Stack>

      {/* categories section */}
      <Divider borderColor={backgroundContainer2()} />
      <Categories />
    </Stack>
  );
};

export default Menu;
