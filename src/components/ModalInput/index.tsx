/* eslint-disable @typescript-eslint/no-unused-vars */

// import library used
import { createTask, selectTasks, updateTask } from "@/redux/taskSlice";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DateTime } from "luxon";

// styling and library of text editor
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// import redux state from react-redux
import { useDispatch, useSelector } from "react-redux";

// import style global from components folder
import { backgroundColor, primaryTextColor } from "@/components/styles";

// import interface
import { taskType } from "@/util/type";
import { useParams } from "react-router-dom";

const ModalInput = (props: {
  isOpen: boolean;
  onClose: () => void;
  updated?: any;
  task?: any;
}) => {
  const toast = useToast();
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      description: props.task ? props.task.description : "",
    },
  });
  const selectedCategory = watch("category");
  const path = useParams();

  // state used to retrieve the previous data for the edit function
  const [data, setData] = useState([]);

  // state used to get array unique category for create data (options category)
  const [category, setCategory] = useState<string[]>([]);

  // get date today
  const today = DateTime.local().toISODate();

  // handle onchange of description
  const handleQuillChange = (content, _, __, editor) => {
    setValue("description", editor.getHTML());
  };

  // function to handle submit if user click "save"
  const onSubmit = (data: taskType) => {
    console.log(data.description);
    // data.deadline = new Date(data.deadline).toISOString();
    // if custom category, replace customOption in category variable
    if (data.customOption) {
      data.category = data.customOption;
      const { customOption, ...dataToSend } = data;

      if (props.task) {
        dispatch(updateTask({ id: props.task.id, updatedData: dataToSend }));
        props.updated(true);
      } else {
        dispatch(createTask(dataToSend));
      }
    } else {
      if (props.task) {
        dispatch(updateTask({ id: props.task.id, updatedData: data }));
        props.updated(true);
      } else {
        dispatch(createTask(data));
      }
    }

    // show message if update and create successfully
    toast({
      title: props.task ? "Task updated" : "Task created",
      description: props.task
        ? "We've edited your account for you."
        : "We've created your account for you.",
      status: "success",
      duration: 1000,
      position: "top",
      isClosable: true,
    });

    // if after submit process, reset and close the modal
    props.onClose();
    reset();
  };

  // Set the initial value when the component mounts
  useEffect(() => {
    setValue("description", props.task ? props.task.description : "");
  }, [props.task, setValue]);

  // initiate default value for completed if action create
  useEffect(() => {
    if (props.task) {
      setValue("completed", props.task.completed);
    } else {
      setValue("completed", false);
    }
  }, [setValue, props.task]);

  useEffect(() => {
    if (path.category) {
      setValue("category", path.category.replace(/-/g, " "));
    }
  }, [setValue, path]);

  // get global state for setData
  useEffect(() => {
    try {
      setData(JSON.parse(localStorage.tasks));
    } catch (error) {
      localStorage.tasks = JSON.stringify(tasks);
    }
  }, [tasks]);

  // get unique value from task's category
  useEffect(() => {
    let uniqueCategories: string[] = [];
    if (data) {
      uniqueCategories = [...new Set(data.map((item: any) => item.category))];
      setCategory(uniqueCategories);
    }
  }, [data]);

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent
        backgroundColor={backgroundColor()}
        color={primaryTextColor()}
      >
        {/* form component */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            {props.task ? "Edit your task" : "Create your task"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                defaultValue={props.task ? props.task.title : undefined}
                {...register("title", {
                  required: "Title cannot be empty",
                })}
                placeholder="Title your tasks"
                maxLength={24}
              />
              {errors.title && (
                <Text fontSize={"xs"} color="red.400" marginTop={1}>
                  {errors.title.message as String}
                </Text>
              )}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Date</FormLabel>
              <Input
                defaultValue={props.task ? props.task.deadline : undefined}
                type="date"
                min={today}
                {...register("deadline", {
                  required: "Deadline cannot be empty",
                })}
              />
              {errors.date && (
                <Text fontSize={"xs"} color="red.400" marginTop={1}>
                  {errors.date.message as String}
                </Text>
              )}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description your task</FormLabel>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <ReactQuill
                    theme="snow"
                    value={field.value}
                    onChange={handleQuillChange}
                  />
                )}
              />
              {/* <Input
                type="text"
                defaultValue={props.task ? props.task.description : undefined}
                {...register("description", {
                  required: "Description cannot be empty",
                })}
                placeholder="detail your task"
              />
              {errors.description && (
                <Text fontSize={"xs"} color={"red.400"} marginTop={1}>
                  {errors.description.message as String}
                </Text>
              )} */}
            </FormControl>
            {!path.category ? (
              <FormControl mt={4}>
                <FormLabel>Category</FormLabel>
                <Select
                  defaultValue={props.task ? props.task.category : ""}
                  {...register("category", {
                    required: "Category cannot be empty",
                  })}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {category &&
                    category.map((item: any, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  <option value="others">Others</option>
                </Select>
                {(!watch("category") || watch("category") === "") && (
                  <Text fontSize="xs" color="red.400" marginTop={1}>
                    {errors.category && (errors.category.message as String)}
                  </Text>
                )}
              </FormControl>
            ) : null}
            {selectedCategory === "others" && (
              <FormControl mt={4}>
                <FormLabel>Others category</FormLabel>
                <Input
                  type="text"
                  {...register("customOption", {
                    required: "Category cannot be empty",
                  })}
                  placeholder="others category"
                />
                {errors.customOption && (
                  <Text fontSize={"xs"} color={"red.400"} marginTop={1}>
                    {errors.customOption.message as String}
                  </Text>
                )}
              </FormControl>
            )}
            <FormControl mt={4}>
              <FormLabel>Priority</FormLabel>
              <Select
                defaultValue={props.task ? props.task.priority : ""}
                {...register("priority", {
                  required: "Priority cannot be empty",
                })}
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="tinggi">Urgent</option>
                <option value="sedang">Medium</option>
                <option value="rendah">Easy</option>
              </Select>
              {(!watch("priority") || watch("priority") === "") && (
                <Text fontSize="xs" color="red.400" marginTop={1}>
                  {errors.priority && (errors.priority.message as String)}
                </Text>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button
              onClick={() => {
                reset();
                props.onClose && props.onClose();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ModalInput;
