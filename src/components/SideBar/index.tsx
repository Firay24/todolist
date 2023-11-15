// import library used
import { Stack, Text, Button, useDisclosure } from "@chakra-ui/react";

// import style global
import {
  backgroundColorButton,
  backgroundContainer,
  backgroundContainer2,
  generateScrollbarStyle,
} from "../styles";

// import icons from react-icons
import { AiOutlinePlus } from "react-icons/ai";

// import components
import Menu from "./sections/menu";
import ModeSwitch from "./sections/modeSwitch";
import ModalInput from "../ModalInput";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTasks } from "@/redux/taskSlice";
import { createCategory } from "@/redux/categorySlice";

const SideBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  // updated category global state if task changed
  useEffect(() => {
    const dataCategory = JSON.parse(localStorage.getItem("categories"));
    dataCategory.map((item) => {
      dispatch(
        createCategory({
          category: item.category,
          icon: item.icon,
        })
      );
    });
  }, [tasks]);

  return (
    <>
      <Stack
        backgroundColor={backgroundContainer()}
        minHeight={"120vh"}
        width="250px"
        position={"fixed"}
      >
        <Stack
          position={"fixed"}
          borderRight={"1px"}
          borderColor={backgroundContainer2()}
          width="250px"
          maxHeight="85vh"
          backgroundColor={backgroundContainer()}
          overflowY="auto"
          css={generateScrollbarStyle()}
        >
          <Menu />
        </Stack>
        <Stack
          bottom={0}
          position={"fixed"}
          padding={4}
          backgroundColor={backgroundContainer()}
          width="250px"
        >
          <ModeSwitch />
          <Stack bottom={0} marginTop={2}>
            <Stack>
              <Button
                size={"sm"}
                onClick={onOpen}
                gap={3}
                backgroundColor={backgroundColorButton()}
                color={"white"}
                _hover={{ backgroundColor: "blackAlpha.900" }}
              >
                <AiOutlinePlus />
                <Text fontWeight={"medium"}>Tasks</Text>
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      {/* modal to create and edit task*/}
      <ModalInput isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default SideBar;
