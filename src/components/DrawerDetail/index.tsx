// import library used
import {
  Badge,
  Button,
  ButtonGroup,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Editable,
  EditableInput,
  EditablePreview,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Input,
  Spacer,
  Stack,
  Text,
  useEditableControls,
} from "@chakra-ui/react";
import ReactHtmlParser from "html-react-parser"; // to html parser from description of task
import { Upload, message } from "antd";

// import react-icons
import { IoIosArrowForward } from "react-icons/io";
import {
  BiCategoryAlt,
  BiCalendarCheck,
  BiPencil,
  BiCheckCircle,
} from "react-icons/bi";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoCopyOutline, IoAttachOutline } from "react-icons/io5";
import { LiaDownloadSolid } from "react-icons/lia";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { BsCircle, BsCheckCircleFill } from "react-icons/bs";

// state global from redux flow
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addStepToTask,
  deleteStepFromTask,
  updateStepCompleted,
} from "@/redux/taskSlice";

// import global styling
import {
  backgroundContainer,
  backgroundContainer2,
  backgroundContainer3,
  backgroundContainer4,
  borderColor2,
  generateScrollbarStyle,
  primaryTextColor,
  secondaryColor,
} from "../styles";

import { data } from "@/util/data";

const DrawerDetailTask = (props: {
  isOpenDrawer: boolean;
  setIsOpenDrawer: any;
  task: any;
}) => {
  const dispatch = useDispatch();

  // state to know the status of the task in the editing state or not
  const [isEditing, setIsEditing] = useState(false);
  const [step, setStep] = useState("add step");

  // state status copied
  const [isCopied, setIsCopied] = useState(false);
  const [fileList, setFileList] = useState([]);

  // state, have a task's file
  const uploadedFiles = JSON.parse(
    localStorage.getItem("uploadedFiles") || "{}"
  );
  const [isDisabled, setIsDisabled] = useState(!uploadedFiles[props.task.id]);
  const [isFile, setIsFile] = useState(false);

  // generate time
  function getToday(value: string) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(value);
    return date.toLocaleDateString("id-ID", options);
  }

  // function to convert iso string to datetime
  const convertToIndonesiaTime = (utcDateTime: string) => {
    const indonesiaTimezone = "Asia/Jakarta";
    const utcDate = new Date(utcDateTime);

    // created formatter object
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };

    // Format date and time to Indonesian time zone
    const indonesiaDate = new Intl.DateTimeFormat("id-ID", options).format(
      new Date(utcDate.toLocaleString("en-US", { timeZone: indonesiaTimezone }))
    );

    return indonesiaDate;
  };

  // handle upload file
  const handleUpload = (file, taskId) => {
    try {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const dataURI = event.target.result;
          const uploadedFiles =
            JSON.parse(localStorage.getItem("uploadedFiles")) || {};
          uploadedFiles[taskId] = dataURI;

          // Save the object back to localStorage
          localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));

          message.success(
            "File berhasil diunggah untuk tugas dengan ID " + taskId
          );
        } catch (error) {
          console.error("Gagal mengunggah file:", error.message);
          message.error("Gagal mengunggah file.");
        }
      };

      // Read files as URI data
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Gagal mengunggah file:", error.message);
      message.error("Gagal mengunggah file.");
    }
  };

  // call handleUpload function
  const customRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
      handleUpload(file, props.task.id);
      if (file) {
        setIsFile(true);
      }
    }, 1000);
  };

  // handle download file
  const handleDownload = (taskId) => {
    const uploadedFiles =
      JSON.parse(localStorage.getItem("uploadedFiles")) || {};
    const dataURI = uploadedFiles[taskId];

    if (dataURI) {
      const downloadLink = document.createElement("a");
      downloadLink.href = dataURI;
      downloadLink.download = `file_${taskId}`;
      downloadLink.click();
    } else {
      message.warning(
        "File untuk tugas dengan ID " + taskId + " tidak ditemukan."
      );
    }
  };

  // handle to copy description of task to clipboard
  const handleCopyDescription = () => {
    const convertHTMLToPlainText = (htmlString: string) => {
      const tempElement = document.createElement("div");
      tempElement.innerHTML = htmlString;

      const lists = tempElement.querySelectorAll("ol, ul");

      lists.forEach((list) => {
        const listItems = list.querySelectorAll("li");
        const plainTextList = document.createElement("ol");

        listItems.forEach((listItem, index) => {
          const textContentWithoutPrefix = listItem.textContent.replace(
            /^[kn]\d*\.?\s*/i,
            ""
          );
          const textNode = document.createTextNode(
            `${index + 1}. ${textContentWithoutPrefix}`
          );
          const listItemClone = document.createElement("li");
          listItemClone.appendChild(textNode);
          plainTextList.appendChild(listItemClone);
        });

        list.replaceWith(plainTextList);
      });
      const plainText = tempElement.textContent.replace(/^[kn]\s*/i, "");
      const formattedText = plainText.replace(/(\D)(\d)/g, "$1\n$2");

      return formattedText;
    };

    const description = convertHTMLToPlainText(props.task.description);
    navigator.clipboard.writeText(description);
    setIsCopied(true);
  };

  // handle submit
  const handleSubmit = (value: string) => {
    dispatch(
      addStepToTask({
        taskId: props.task.id,
        step: value,
      })
    );
    setIsEditing(false);
    setStep("add step");
  };

  // handle function to updated completed step of task
  const handleUpdatedCompletedStep = ({ stepId, value }) => {
    // console.log(stepId, value, props.task.id);
    dispatch(
      updateStepCompleted({
        taskId: props.task.id,
        stepId: stepId,
        completed: !value,
      })
    );
  };

  // component editablecontrol
  const EditableControls = () => {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
      useEditableControls();

    if (isEditing) {
      setIsEditing(true);
    }

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          size={"xs"}
          aria-label=""
          icon={<CloseIcon />}
          {...getCancelButtonProps()}
        />
        <IconButton
          size={"xs"}
          aria-label=""
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
        />
      </ButtonGroup>
    ) : null;
  };

  // show badge if copy to cliptoboard successfully
  useEffect(() => {
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }, [isCopied]);

  // check available a task's file
  useEffect(() => {
    const uploadedFiles = JSON.parse(
      localStorage.getItem("uploadedFiles") || "{}"
    );
    setIsDisabled(!uploadedFiles[props.task.id]);
    setIsFile(false);
  }, [isFile, props.task.id]);

  return (
    <Drawer
      isOpen={props.isOpenDrawer}
      placement="right"
      onClose={() => props.setIsOpenDrawer(false)}
      size={{ base: "lg", md: "xs" }}
    >
      <DrawerOverlay minHeight={{ base: "200vh", md: "100vh" }} />
      <DrawerContent
        // overflow={"visible"}
        backgroundColor={backgroundContainer()}
        color={primaryTextColor()}
        minHeight={{ base: "200vh", md: "100vh" }}
      >
        <DrawerHeader>{props.task.title}</DrawerHeader>
        <DrawerBody
          position={"relative"}
          overflowY="auto"
          css={generateScrollbarStyle()}
        >
          <IconButton
            aria-label="Close drawer"
            icon={<IoIosArrowForward />}
            isRound={true}
            variant="solid"
            size="xs"
            position={"fixed"}
            transform="translateY(-50%)"
            top={"50%"}
            left={-2}
            onClick={() => props.setIsOpenDrawer(false)}
            zIndex={100}
            backgroundColor={backgroundContainer2()}
            color={primaryTextColor()}
            _hover={{ backgroundColor: backgroundContainer3() }}
          />

          {/* information section */}
          <Stack>
            <Grid templateColumns="repeat(2, 1fr)" alignItems={"center"}>
              <GridItem>
                <HStack color={secondaryColor()} fontSize={"xs"}>
                  <BiCategoryAlt />
                  <Text>Category</Text>
                </HStack>
              </GridItem>
              <GridItem>
                <Text fontSize={"xs"}>{props.task.category}</Text>
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" alignItems={"center"}>
              <GridItem>
                <HStack color={secondaryColor()} fontSize={"xs"}>
                  <BiCheckCircle />
                  <Text>Progress</Text>
                </HStack>
              </GridItem>
              <GridItem>
                <Badge
                  variant="solid"
                  colorScheme={props.task.completed ? "green" : "blue"}
                  fontSize={"10px"}
                >
                  {props.task.completed ? "Done" : "Doing"}
                </Badge>
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" alignItems={"center"}>
              <GridItem>
                <HStack color={secondaryColor()} fontSize={"xs"}>
                  <BiCalendarCheck />
                  <Text>Deadline</Text>
                </HStack>
              </GridItem>
              <GridItem>
                <Text fontSize={"xs"}>{getToday(props.task.deadline)}</Text>
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" alignItems={"center"}>
              <GridItem>
                <HStack color={secondaryColor()} fontSize={"xs"}>
                  <BiPencil />
                  <Text>Created</Text>
                </HStack>
              </GridItem>
              <GridItem>
                <Text fontSize={"xs"}>
                  {props.task.created &&
                    convertToIndonesiaTime(props.task.created)}
                </Text>
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" alignItems={"center"}>
              <GridItem>
                <HStack color={secondaryColor()} fontSize={"xs"}>
                  <IoMdArrowDropdownCircle />
                  <Text>Priority</Text>
                </HStack>
              </GridItem>
              <GridItem>
                <Badge
                  variant="subtle"
                  colorScheme={
                    props.task.priority === "rendah"
                      ? "green"
                      : props.task.priority === "sedang"
                      ? "yellow"
                      : "red"
                  }
                  fontSize={"10px"}
                >
                  {props.task.priority === "rendah"
                    ? "easy"
                    : props.task.priority === "sedang"
                    ? "medium"
                    : "urgent"}
                </Badge>
              </GridItem>
            </Grid>
          </Stack>

          {/* task's steps section */}
          <Stack
            // backgroundColor={"gray.50"}
            marginTop={6}
            rounded={"md"}
            padding={2}
            backgroundColor={backgroundContainer4()}
          >
            <Text fontSize={"xs"} color={secondaryColor()} marginLeft={2}>
              Steps
            </Text>
            {props.task.steps &&
              props.task.steps.map((item, index) => (
                <Stack key={index}>
                  <HStack fontSize={"xs"}>
                    <HStack>
                      <Button
                        variant={"unstyled"}
                        color={secondaryColor()}
                        onClick={() =>
                          handleUpdatedCompletedStep({
                            value: item.completed,
                            stepId: item.id,
                          })
                        }
                        fontSize={"xs"}
                        size={"auto"}
                        width={"auto"}
                      >
                        {item.completed ? <BsCheckCircleFill /> : <BsCircle />}
                      </Button>
                      {/* <Text color={"green.500"}>
                      {item.completed ? <BsCheckCircleFill /> : <BsCircle />}
                    </Text> */}
                      <Text
                        color={item.completed && secondaryColor()}
                        textDecoration={item.completed && "line-through"}
                      >
                        {item.desc}
                      </Text>
                    </HStack>
                    <Spacer />
                    <Stack>
                      <Button
                        variant={"unstyled"}
                        color={secondaryColor()}
                        fontSize={"xs"}
                        size={"auto"}
                        width={"auto"}
                        onClick={() =>
                          dispatch(
                            deleteStepFromTask({
                              taskId: props.task.id,
                              stepId: item.id,
                            })
                          )
                        }
                      >
                        <AiOutlineClose />
                      </Button>
                    </Stack>
                  </HStack>
                  <Divider borderColor={borderColor2()} />
                </Stack>
              ))}
            <Stack>
              <Editable fontSize={"xs"} onSubmit={handleSubmit} value={step}>
                <HStack>
                  <HStack>
                    <Text fontSize={"xs"}>
                      {isEditing ? <BsCircle /> : <AiOutlinePlus />}
                    </Text>
                    <EditablePreview />
                  </HStack>
                  <Stack>
                    <Input
                      _focus={{
                        boxShadow: "none",
                      }}
                      variant={"unstyled"}
                      as={EditableInput}
                      size={"xs"}
                      onChange={(e) => setStep(e.target.value)}
                    />
                  </Stack>
                  <EditableControls />
                </HStack>
              </Editable>
            </Stack>
          </Stack>

          {/* task's description section */}
          <Stack
            rounded={"md"}
            // backgroundColor={"gray.50"}
            padding={5}
            marginTop={6}
            backgroundColor={backgroundContainer4()}
          >
            <HStack>
              <Text fontSize={"xs"} color={secondaryColor()}>
                Description
              </Text>
              <Spacer />
              {isCopied ? (
                <Badge variant="solid" colorScheme="green" fontSize={"10px"}>
                  Copied
                </Badge>
              ) : null}
              <Button
                onClick={handleCopyDescription}
                size={"auto"}
                color={secondaryColor()}
                fontSize={"xs"}
              >
                <IoCopyOutline />
              </Button>
            </HStack>
            <Text fontSize={"sm"}>
              {ReactHtmlParser(props.task && props.task.description)}
            </Text>
            <HStack>
              <Upload
                customRequest={customRequest}
                fileList={fileList}
                showUploadList={false}
              >
                <Button size={"auto"} color={secondaryColor()} fontSize={"xs"}>
                  <IoAttachOutline />
                </Button>
              </Upload>
              <Button
                size={"auto"}
                color={secondaryColor()}
                fontSize={"xs"}
                onClick={() => handleDownload(props.task.id)}
                isDisabled={isDisabled}
              >
                <LiaDownloadSolid />
              </Button>
            </HStack>
          </Stack>
        </DrawerBody>
        <DrawerFooter justifyContent={"center"}>
          <Text fontSize={"xs"} color={secondaryColor()}>
            <Text as="span" fontWeight={"semibold"}>
              Created on,{" "}
            </Text>
            {props.task.created && convertToIndonesiaTime(props.task.created)}
          </Text>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerDetailTask;
