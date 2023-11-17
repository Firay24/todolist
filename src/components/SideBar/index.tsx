// import library used
import {
  Stack,
  Text,
  Button,
  useDisclosure,
  useBreakpointValue,
  Spacer,
} from "@chakra-ui/react";

// import style global
import {
  backgroundColorButton,
  backgroundContainer,
  backgroundContainer2,
  borderColor,
  generateScrollbarStyle,
  primaryTextColor,
} from "../styles";

// import icons from react-icons
import { AiOutlinePlus } from "react-icons/ai";
import { BsList } from "react-icons/bs";

// import components
import Menu from "./sections/menu";
import ModeSwitch from "./sections/modeSwitch";
import ModalInput from "../ModalInput";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTasks } from "@/redux/taskSlice";
import { createCategory } from "@/redux/categorySlice";

const SideBar = (props: { showSidebar: boolean; closeSidebar: any }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  // state to responsive
  const isMobile = useBreakpointValue({ base: true, md: false });

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
      {props.showSidebar || !isMobile ? (
        <>
          <Stack
            backgroundColor={backgroundContainer()}
            minHeight={{ base: "100vh", md: "100vh" }}
            maxHeight={{ base: "100vh", md: "100vh" }}
            width={{ base: "300px", md: "20%" }}
            position={"fixed"}
            zIndex={100}
            maxWidth={{ base: "90%", md: "20%" }}
          >
            <Stack
              borderRight={"1px"}
              borderColor={borderColor()}
              width={{ base: "300px", md: "20%" }}
              backgroundColor={backgroundContainer()}
              maxWidth={{ base: "300px", md: "20%" }}
              overflowY="auto"
              css={generateScrollbarStyle()}
            >
              <Menu onCloseSidebar={props.closeSidebar} isMobile={isMobile} />
            </Stack>
            <Spacer />
            <Stack
              padding={4}
              backgroundColor={backgroundContainer()}
              width={{ base: "300px", md: "20%" }}
              maxWidth={{ base: "90%", md: "20%" }}
            >
              <ModeSwitch />
              <Stack bottom={0} marginTop={2}>
                <Stack maxWidth={{ base: "260px", md: "30%" }}>
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
        </>
      ) : null}
      <ModalInput isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default SideBar;
