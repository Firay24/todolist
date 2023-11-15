// import library used
import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

// import component and global style
import SideBar from "../components/SideBar";
import { backgroundColor } from "@/components/styles";

const Layout = () => {
  return (
    <Grid
      templateColumns="repeat(10, 1fr)"
      backgroundColor={backgroundColor()}
      alignItems={"start"}
      minHeight={"100vh"}
    >
      <GridItem colSpan={2}>
        <SideBar />
      </GridItem>
      <GridItem colSpan={8} marginLeft={3}>
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default Layout;
