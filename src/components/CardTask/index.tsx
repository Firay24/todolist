// import library used
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  Heading,
  IconButton,
  Input,
  Spacer,
  Stack,
  Text,
  useDisclosure,
  useEditableControls,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ReactHtmlParser from "html-react-parser"; // to html parser from description of task

// import global styles
import {
  backgroundColorHover,
  backgroundContainer,
  backgroundContainer2,
  borderColor,
  primaryTextColor,
  secondaryColor,
} from "../styles";

// import icons
import {
  BsFillRecordCircleFill,
  BsSquare,
  BsCheckSquare,
  BsCalendarCheck,
} from "react-icons/bs";
import { TbEditCircle } from "react-icons/tb";
import { RiDraggable } from "react-icons/ri";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { BiCheckCircle } from "react-icons/bi";

// import component used
import ConfirmModal from "../Confirm";
import ModalInput from "../ModalInput";
import DrawerDetailTask from "../DrawerDetail";

// import global state redux
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  selectTaskById,
  selectTasks,
  updateTask,
} from "@/redux/taskSlice";

// drag and drop
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

// styling untuk set maximal character in display card task
import { truncateText } from "@/util/maxCharacter";

const CardTask = (props: {
  task: any;
  id?: any;
  category?: any;
  titleUpdated: any;
  updated: any;
  updateCompleted?: any;
  deleted: any;
  layout: string;
}) => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);

  // state to editable task title and handler trigger if title updated
  const [title, setTitle] = useState(props.task.title);
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState("");
  const [update, setUpdate] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(false);

  // state to handler modal trigger
  const { isOpen, onOpen, onClose } = useDisclosure();

  // state to handler drawer
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  // state drag and drop
  const [isDraggable, setIsDraggable] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: {
      category: props.category,
    },
    disabled: !isDraggable,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    touchAction: "none",
    cursor: isDraggable ? "grab" : "default",
  };

  // generate time
  const getToday = (value: string) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(value);
    return date.toLocaleDateString("id-ID", options);
  };

  // handler set value from isOpenDrawer state
  const handlerSetIsOpenDrawer = (value: boolean) => {
    setIsOpenDrawer(value);
  };

  // function edit title control
  const EditableControls = () => {
    const toast = useToast();
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    if (isEditing) {
      setIsEditing(true);
    }

    // show message if update successfully
    const handleCheckIconClick = () => {
      toast({
        title: "Task updated",
        description: "We've edited your task for you.",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      props.titleUpdated(true);
      setIsEditing(false);
      setUpdatedTitle(true);
    };

    // handle close icon to edit cancel
    const handleCloseClick = () => {
      setUpdatedTitle(false);
      setTitle(props.task.title);
    };

    return isEditing ? (
      <HStack justifyContent="center">
        <IconButton
          aria-label=""
          icon={<CheckIcon />}
          {...getSubmitButtonProps({ onClick: handleCheckIconClick })}
          size={"sm"}
        />
        <IconButton
          aria-label=""
          icon={<CloseIcon />}
          {...getCancelButtonProps({ onClick: handleCloseClick })}
          size={"sm"}
        />
      </HStack>
    ) : (
      <IconButton
        aria-label=""
        size="sm"
        variant={"unstyled"}
        icon={<EditIcon />}
        {...getEditButtonProps()}
      />
    );
  };

  // handler function to delete
  const handleDelete = (id: any) => {
    dispatch(deleteTask(id));
    props.deleted(true);
  };

  // if updated from card component
  const handleUpdated = (value: any) => {
    setUpdate(value);
    props.updated(value);
  };

  // handle updated completed task
  const handleEditCompleted = () => {
    const localData = localStorage.getItem("tasks") || "";
    const parsedLocalData = tasks ? JSON.parse(localData) : [];
    const updateCompleted = {
      completed: !props.task.completed,
    };
    const taskIndex = parsedLocalData.findIndex(
      (task: any) => task.id === props.task.id
    );
    parsedLocalData[taskIndex] = {
      ...parsedLocalData[taskIndex],
      ...updateCompleted,
    };
    const { id, ...newData } = parsedLocalData[taskIndex];
    dispatch(updateTask({ id: id, updatedData: newData }));
  };

  // handle handleOnMouseDown icon drag
  const handleOnMouseDown = () => {
    setIsDraggable(true);
  };

  // handle handleOnMouseDown icon drag
  const hanldeOnMouseUp = () => {
    setIsDraggable(false);
  };

  // get value from task to send modal edit
  useEffect(() => {
    try {
      const taskToSet = tasks.find((task: any) => task.id === props.task.id);
      if (taskToSet) {
        setTask(taskToSet);
      }
    } catch (error) {
      setTask((state) => selectTaskById(state, props.task.id));
    }
  }, [props.task, tasks]);

  // effect updateTask if user click edit title button
  useEffect(() => {
    if (updatedTitle) {
      const localData = localStorage.getItem("tasks") || "";
      const parsedLocalData = tasks ? JSON.parse(localData) : [];
      const updateCompleted = {
        title: title,
      };
      const taskIndex = parsedLocalData.findIndex(
        (task: any) => task.id === props.task.id
      );
      parsedLocalData[taskIndex] = {
        ...parsedLocalData[taskIndex],
        ...updateCompleted,
      };
      const { id, ...newData } = parsedLocalData[taskIndex];
      dispatch(updateTask({ id: id, updatedData: newData }));
      setUpdatedTitle(false);
    }
  }, [updatedTitle]);

  // update tasks if component card updated
  useEffect(() => {
    if (update) {
      setTitle(props.task.title);
    }
  }, [props.task]);

  // configuration icon color priority conditional
  const iconColorPriority =
    props.task.priority === "rendah"
      ? "green.500"
      : props.task.priority === "sedang"
      ? "yellow.400"
      : props.task.priority === "tinggi"
      ? "red.400"
      : "gray";

  return (
    <>
      {/* card components */}
      <Card
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        width={
          props.layout === "panel"
            ? { base: "90%", md: "70%" }
            : { base: "47%", md: "32%" }
        }
        minWidth={
          props.layout === "grid" ? { base: "full", md: "30%" } : "auto"
        }
        aspectRatio={1}
        backgroundColor={backgroundContainer()}
        cursor={"pointer"}
        shadow="lg"
        border="1px"
        borderColor={borderColor()}
        marginBottom={3}
      >
        <CardBody>
          <Stack>
            <Stack>
              {/* heading components */}
              <HStack color={primaryTextColor()} height={"70px"}>
                <Heading fontSize={"xl"}>
                  <Editable
                    value={isEditing ? title : props.task.title}
                    fontSize="xl"
                    isPreviewFocusable={false}
                    display={"inline-flex"}
                  >
                    <Input
                      as={EditableInput}
                      onChange={(e: any) => {
                        const inputValue = e.target.value;
                        if (inputValue.length <= 26) {
                          setTitle(inputValue);
                        }
                      }}
                    />
                    <EditableControls />
                    <EditablePreview />
                  </Editable>
                </Heading>
                <Spacer />
                <HStack>
                  <Text color={iconColorPriority}>
                    <BsFillRecordCircleFill />
                  </Text>
                  {props.layout === "panel" ? (
                    <Button
                      onMouseDown={handleOnMouseDown}
                      onMouseUp={hanldeOnMouseUp}
                      variant={"unstyled"}
                      size={"auto"}
                    >
                      <RiDraggable />
                    </Button>
                  ) : null}
                </HStack>
              </HStack>

              {/* deskription and category */}
              <Stack
                marginTop={3}
                color={secondaryColor()}
                fontSize={"sm"}
                onClick={() => setIsOpenDrawer(true)}
                cursor={"pointer"}
                paddingY={1}
                height={{ base: "110px" }}
              >
                <Text fontWeight={"medium"}>{`#${props.task.category}`}</Text>
                <Text>
                  {ReactHtmlParser(truncateText(props.task.description))}
                </Text>
              </Stack>
            </Stack>

            <Spacer />

            {/* deadline and progress */}
            <Stack>
              <HStack
                marginBottom={0}
                onClick={() => setIsOpenDrawer(true)}
                cursor={"pointer"}
              >
                <HStack>
                  <Text fontSize={"xs"} color={secondaryColor()}>
                    <BsCalendarCheck />
                  </Text>
                  <Text fontSize={"xs"} color={secondaryColor()}>
                    {getToday(props.task.deadline)}
                  </Text>
                </HStack>
                <Spacer />
                <HStack>
                  <Text fontSize={"xs"} color={secondaryColor()}>
                    <BiCheckCircle />
                  </Text>
                  <Text fontSize={"xs"} color={secondaryColor()}>
                    {`${
                      props.task.steps.filter((item: any) => item.completed)
                        .length
                    }/${props.task.steps.length}`}
                  </Text>
                </HStack>
              </HStack>
            </Stack>
          </Stack>
        </CardBody>
        <Divider borderColor={backgroundContainer2()} />
        <CardFooter>
          <HStack justifyContent={"space-between"} width={"100%"}>
            {/* doing or done button */}
            <Button
              width="100%"
              onClick={handleEditCompleted}
              borderColor={backgroundContainer2()}
              gap={2}
              variant={"outline"}
              color={primaryTextColor()}
              _hover={{ backgroundColor: backgroundColorHover() }}
            >
              {props.task.completed ? <BsCheckSquare /> : <BsSquare />}
              <Text>{props.task.completed ? "Done" : "Doing"}</Text>
            </Button>
            <HStack>
              <Button
                onClick={onOpen}
                backgroundColor={backgroundContainer()}
                variant={"outline"}
                color={primaryTextColor()}
                borderColor={backgroundContainer2()}
                _hover={{ backgroundColor: backgroundColorHover() }}
              >
                <TbEditCircle />
              </Button>
              <ConfirmModal handleDelete={() => handleDelete(props.task.id)} />
            </HStack>
          </HStack>
        </CardFooter>
      </Card>

      {/* modal input component when user edit task */}
      <ModalInput
        task={task}
        isOpen={isOpen}
        onClose={onClose}
        updated={handleUpdated}
      />

      {/* drawer to show detail task */}
      <DrawerDetailTask
        task={task}
        isOpenDrawer={isOpenDrawer}
        setIsOpenDrawer={handlerSetIsOpenDrawer}
      />
    </>
  );
};

export default CardTask;
