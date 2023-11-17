import { Button, useToast } from "@chakra-ui/react";

import {
  backgroundContainer,
  backgroundContainer2,
  borderColor,
  primaryTextColor,
} from "../styles";

// import icons from react-icons
import { BsDownload } from "react-icons/bs";

// import download and convert function from util
import downloadCSV from "@/util/export";
import { convertToCSV } from "@/util/export";

const ButtonExport = (props: { data: any }) => {
  const toast = useToast();

  // function to export data
  const handleDownload = () => {
    const csvData = convertToCSV(props.data);
    downloadCSV(csvData);

    toast({
      title: "Task Export",
      description: "Export task successfully",
      status: "success",
      duration: 1000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Button
      onClick={handleDownload}
      backgroundColor={backgroundContainer()}
      size={"sm"}
      borderColor={borderColor()}
      borderWidth={1}
      color={primaryTextColor()}
      _hover={{ backgroundColor: backgroundContainer2() }}
      width={{ base: "10%", md: "auto" }}
    >
      <BsDownload />
    </Button>
  );
};

export default ButtonExport;
