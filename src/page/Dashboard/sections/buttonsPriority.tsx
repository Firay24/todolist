/* eslint-disable @typescript-eslint/no-explicit-any */
// THIS FUNCTION TO CREATE FILTER FIELD BY PRIORITY TASKS

import { Divider, HStack } from "@chakra-ui/react";
import ButtonPriority from "./buttonPriority";
import filterFeature from "@/util/filter";
import { useEffect, useState } from "react";
import { backgroundContainer2 } from "@/components/styles";
import { useSelector } from "react-redux";
import { selectTasks } from "@/redux/taskSlice";

const ButtonsPriority = (props: { sendData: any }) => {
  // tasks data
  const [data, setData] = useState([]);
  const task = useSelector(selectTasks);

  // when user click button all task?
  const [statusButton, setStatusButton] = useState("all");

  // handler function to filter by priority in ButtonCategory component
  const handlerButtonPriority = (value: any) => {
    const result = filterFeature({
      data: task,
      criteria: "priority",
      value: value,
    });
    setStatusButton(value);
    setData(result);
  };

  // handler function when user click "all tasks"
  const handleAll = () => {
    setData(JSON.parse(localStorage.tasks));
    setStatusButton("all");
  };

  useEffect(() => {
    props.sendData(data);
  }, [data]);

  // send default original data b'cause empty filter return dashboard page empty array
  useEffect(() => {
    setData(JSON.parse(localStorage.tasks));
  }, []);

  return (
    <HStack width="100%" gap={0} alignItems={"end"} justifyContent={"end"}>
      <ButtonPriority
        onClick={statusButton === "all"}
        title="All task"
        position="left"
        handlerClick={handleAll}
      />
      <Divider orientation="vertical" borderColor={backgroundContainer2()} />
      <ButtonPriority
        title="Urgent"
        handlerClick={() => handlerButtonPriority("tinggi")}
        onClick={statusButton === "tinggi"}
      />
      <Divider orientation="vertical" borderColor={backgroundContainer2()} />
      <ButtonPriority
        title="Medium"
        handlerClick={() => handlerButtonPriority("sedang")}
        onClick={statusButton === "sedang"}
      />
      <Divider orientation="vertical" borderColor={backgroundContainer2()} />
      <ButtonPriority
        title="Easy"
        position="right"
        handlerClick={() => handlerButtonPriority("rendah")}
        onClick={statusButton === "rendah"}
      />
    </HStack>
  );
};

export default ButtonsPriority;
