// import library used
import { Divider, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

// import components used
import ButtonComponent from "./sections/ButtonComponent";

// import redux state
import { useSelector } from "react-redux";
import { selectTasks } from "@/redux/taskSlice";

// import utils function and global style
import filterFeature from "@/util/filter";
import { backgroundContainer2 } from "../styles";

const ButtonPriority = (props: {
  sendData: any;
  useFilter: any;
  deleted: any;
  statusDeleted: any;
}) => {
  // tasks data
  const [data, setData] = useState([]);
  const task = useSelector(selectTasks);

  // when user click button all task?
  const [statusButton, setStatusButton] = useState("all");
  const [valueButton, setValueButton] = useState("");

  // handler function to filter by priority in ButtonCategory component
  const handlerButtonPriority = (value: any) => {
    const result = filterFeature({
      data: task,
      criteria: "priority",
      value: value,
    });
    setStatusButton(value);
    setData(result);
    props.useFilter(true);
  };

  // handler function when user click "all tasks"
  const handleAll = () => {
    setData(task);
    setStatusButton("all");
    props.useFilter(true);
  };

  // if the data changes, will send the result to the parent component
  useEffect(() => {
    props.sendData(data);
  }, [data]);

  // send default original data b'cause empty filter return dashboard page empty array
  useEffect(() => {
    setData(JSON.parse(localStorage.tasks));
  }, []);

  useEffect(() => {
    if (props.deleted) {
      const result = filterFeature({
        data: task,
        criteria: "priority",
        value: valueButton,
      });
      setStatusButton(valueButton);
      setData(result);
      props.useFilter(true);
      props.statusDeleted(false);
    }
  }, [props.deleted]);

  return (
    <HStack
      width="full"
      gap={0}
      alignItems={{ base: "start", md: "end" }}
      justifyContent={{ base: "start", md: "end" }}
    >
      <ButtonComponent
        onClick={statusButton === "all"}
        title="All task"
        position="left"
        handlerClick={handleAll}
      />
      <Divider orientation="vertical" borderColor={backgroundContainer2()} />
      <ButtonComponent
        title="Urgent"
        handlerClick={() => {
          handlerButtonPriority("tinggi");
          setValueButton("tinggi");
        }}
        onClick={statusButton === "tinggi"}
      />
      <Divider orientation="vertical" borderColor={backgroundContainer2()} />
      <ButtonComponent
        title="Medium"
        handlerClick={() => {
          handlerButtonPriority("sedang");
          setValueButton("sedang");
        }}
        onClick={statusButton === "sedang"}
      />
      <Divider orientation="vertical" borderColor={backgroundContainer2()} />
      <ButtonComponent
        title="Easy"
        position="right"
        handlerClick={() => {
          handlerButtonPriority("rendah");
          setValueButton("rendah");
        }}
        onClick={statusButton === "rendah"}
      />
    </HStack>
  );
};

export default ButtonPriority;
