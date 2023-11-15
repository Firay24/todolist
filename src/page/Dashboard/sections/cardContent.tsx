/* eslint-disable @typescript-eslint/no-explicit-any */

// import used library
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Editable,
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
  EditableInput,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

// import components to used
import {
  backgroundColorHover,
  backgroundContainer,
  backgroundContainer2,
  primaryTextColor,
  secondaryColor,
} from "@/components/styles";
import ModalInput from "@/components/ModalInput";
import ConfirmModal from "@/components/Confirm";

// import redux action and state
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  selectTaskById,
  selectTasks,
  updateTask,
} from "@/redux/taskSlice";

// import icons
import {
  BsFillRecordCircleFill,
  BsSquare,
  BsCheckSquare,
} from "react-icons/bs";
import { TbEditCircle } from "react-icons/tb";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

const CardContent = (props: {
  task: any;
  titleUpdated: any;
  updated: any;
  updateCompleted: any;
  deleted: any;
}) => {
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const [title, setTitle] = useState(props.task.title);
  const [isEditing, setIsEditing] = useState(false);
  const [update, setUpdate] = useState(false);

  // state to handler modal trigger
  const { isOpen, onOpen, onClose } = useDisclosure();

  // function edit title control
  function EditableControls() {
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
          {...getCancelButtonProps()}
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
  }

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
  }, [title]);

  // update tasks if component card updated
  useEffect(() => {
    if (update) {
      setTitle(props.task.title);
    }
  }, [props.task]);

  // updated state title if task updated
  // useEffect(() => {
  //   setTitle(props.task.title);
  // }, [task]);

  // console.log(props.task);

  // handler function to delete
  const handleDelete = (id: any) => {
    dispatch(deleteTask(id));
    props.deleted(true);
  };

  // handle updated title task
  const handleTitleEdit = (value: any) => {
    setTitle(value);
    setIsEditing(false);
  };

  // handle updated completed task
  const handleEditCompleted = () => {
    props.updateCompleted(true);
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

  // if updated from card component
  const handleUpdated = (value: any) => {
    setUpdate(value);
    props.updated(value);
  };

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
      <Card
        width={"30%"}
        height="250px"
        backgroundColor={backgroundContainer()}
      >
        <CardBody>
          <HStack color={primaryTextColor()}>
            <Heading fontSize={"xl"}>
              <Editable
                value={isEditing ? title : props.task.title}
                fontSize="xl"
                isPreviewFocusable={false}
                display={"inline-flex"}
                onSubmit={handleTitleEdit}
              >
                <Input
                  as={EditableInput}
                  onChange={(e: any) => setTitle(e.target.value)}
                />
                <EditableControls />
                <EditablePreview />
              </Editable>
            </Heading>
            <Spacer />
            <Stack color={iconColorPriority}>
              <BsFillRecordCircleFill />
            </Stack>
          </HStack>
          <Stack marginTop={3} color={secondaryColor()} fontSize={"sm"}>
            <Text fontWeight={"medium"}>{`#${props.task.category}`}</Text>
            <Text>{props.task.description}</Text>
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
      <ModalInput
        task={task}
        isOpen={isOpen}
        onClose={onClose}
        updated={handleUpdated}
      ></ModalInput>
    </>
  );
};

export default CardContent;
