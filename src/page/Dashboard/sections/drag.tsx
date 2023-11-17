// import library used
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useEffect, useState } from "react";

// import state redux flow
import { createTask } from "@/redux/taskSlice";
import { useDispatch } from "react-redux";

// Import Papa from the correct location
import Papa from "papaparse";

// import global state
import {
  backgroundContainer,
  backgroundContainer2,
  borderColor,
  primaryTextColor,
  secondaryColor,
} from "@/components/styles";

// import react-icons
import { GrFormUpload } from "react-icons/gr";

const { Dragger } = Upload;

const parseCSV = (csvContent: any) => {
  const results = Papa.parse(csvContent, { header: true });

  const jsonFormatData = results.data.map((csvRow) => {
    return {
      title: csvRow.title || "",
      description: csvRow.description || "",
      completed: false,
      priority: csvRow.priority || "",
      category: csvRow.category || "",
    };
  });
  return jsonFormatData;
};

const DragComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [onSubmit, setOnSubmit] = useState(false);
  const [file, setFile] = useState([]);

  const handleUpload = (file: any) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const jsonData = parseCSV(content);

      jsonData.forEach((item) => {
        if (item.title && item.description && item.priority && item.category) {
          setFile((prevFile) => [...prevFile, item]);
        }
        // if (
        //   item.title &&
        //   item.priority &&
        //   item.description &&
        //   item.category
        // ) {
        //   dispatch(createTask(item));
        // }
      });

      setIsFileUploaded(true);
      setUploadedFileName(file.name);
    };
    reader.readAsText(file);
  };

  const handleUploadAnotherFile = () => {
    setIsFileUploaded(false);
    setUploadedFileName("");
  };

  useEffect(() => {
    if (onSubmit) {
      file.map((item) => dispatch(createTask(item)));
      setIsFileUploaded(false);
      setUploadedFileName("");
    }
  }, [onSubmit]);

  return (
    <>
      <Button
        onClick={onOpen}
        variant={"outline"}
        backgroundColor={backgroundContainer()}
        fontWeight={"medium"}
        fontSize={"sm"}
        width={{ base: "40%", md: "20%" }}
        gap={2}
        color={primaryTextColor()}
        borderColor={borderColor()}
        _hover={{ backgroundColor: backgroundContainer2() }}
        size={"sm"}
      >
        <GrFormUpload />
        <Text>Upload</Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          backgroundColor={backgroundContainer()}
          color={primaryTextColor()}
        >
          <ModalHeader>Upload your file here</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom={4}>
            {isFileUploaded ? (
              <Stack>
                <Text>File Uploaded: {uploadedFileName}</Text>
                <Button onClick={handleUploadAnotherFile} marginTop={4}>
                  Upload Another File
                </Button>
              </Stack>
            ) : (
              <Dragger
                customRequest={({ file }) => handleUpload(file)}
                showUploadList={false}
              >
                <Text className="ant-upload-drag-icon">
                  <InboxOutlined />
                </Text>
                <Text color={primaryTextColor()} fontSize={"md"}>
                  Click or drag file to this area to upload
                </Text>
                <Text color={secondaryColor()} fontSize={"xs"} marginTop={2}>
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </Text>
              </Dragger>
            )}
            {isFileUploaded && (
              <Button
                onClick={() => {
                  setOnSubmit(true);
                  message.success("Berhasil diunggah");
                  onClose();
                }}
                colorScheme="blue"
                marginTop={4}
              >
                Submit
              </Button>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DragComponent;
