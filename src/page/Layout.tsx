// import library used
import { Button, HStack, Stack, useBreakpointValue } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

// import component and global style
import SideBar from "../components/SideBar";
import { backgroundColor, primaryTextColor } from "@/components/styles";
import { BsList } from "react-icons/bs";
import { useState } from "react";

const Layout = () => {
  // state to responsive
  const [showSidebar, setShowSidebar] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });

  // handler to show or not sidebar
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // handler to show or not sidebar
  const closeSidebar = () => {
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  return (
    <HStack
      backgroundColor={backgroundColor()}
      alignItems={"start"}
      minHeight={"100vh"}
    >
      {isMobile && (
        <Button
          variant={"unstyled"}
          size={"auto"}
          onClick={toggleSidebar}
          position={"fixed"}
          top={5}
          left={4}
          zIndex={100}
          color={primaryTextColor()}
        >
          <BsList />
        </Button>
      )}
      {showSidebar || !isMobile ? (
        <Stack>
          <SideBar showSidebar={showSidebar} closeSidebar={closeSidebar} />
        </Stack>
      ) : null}
      <Stack backgroundColor={backgroundColor()} maxWidth={"100%"}>
        <Outlet />
      </Stack>
    </HStack>
  );
};

export default Layout;
