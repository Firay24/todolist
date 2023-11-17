// import library used
import { HStack, Heading, Spacer, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import global state from redux flow
import { useSelector } from "react-redux";
import { selectTasks } from "@/redux/taskSlice";

// import component used
import CardTask from "@/components/CardTask";
import ButtonBack from "@/components/ButtonBack";
import ButtonPriority from "@/components/ButtonPriority";
import FiltersField from "@/components/Filter";

// import global style
import { primaryTextColor } from "@/components/styles";

// interface
interface taskInterface {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: string;
  category: string;
}

const DetailCategory = () => {
  const tasks = useSelector(selectTasks);
  const { category } = useParams();

  // tasks state
  const [data, setData] = useState<taskInterface[]>([]);

  // state to trigger the effects of data and filter changes
  const [isTitleUpdated, setIsTitleUpdated] = useState<boolean>(false);
  const [updated, setUpdated] = useState(false);
  const [updateCompleted, setUpdateCompleted] = useState(false);
  const [useFilter, setUseFilter] = useState(false);

  // update data if there is a change in task
  useEffect(() => {
    const filter = tasks.filter(
      (item: any) =>
        item.category === category ||
        item.category === (category && category.replace(/-/g, " "))
    );
    setData(filter);
  }, [tasks]);

  // update data if there is a change in link path
  useEffect(() => {
    const filter = tasks.filter(
      (item: any) =>
        item.category === category ||
        item.category === (category && category.replace(/-/g, " "))
    );
    setData(filter);
  }, [category]);

  // handle receive status title updated
  const handleTitleUpdated = (value: any) => {
    setIsTitleUpdated(value);
  };

  // handle updated from card content
  const handlerUpdated = (value: any) => {
    setUpdated(value);
  };

  // handle to receive a confirmation that an update occurred on the completed
  const handleUpdateCompleted = (value: any) => {
    setUpdateCompleted(value);
  };

  // handle to receive a confirmation that an deleted occurred on a task
  const handleDelete = (value: any) => {
    if (value) {
      setUseFilter(false);
    }
  };

  const handlerResetFilter = (value: any) => {
    setUseFilter(!value);
    console.log("reset");
  };

  const handlerUseFilter = (value: any) => {
    if (value !== "" && value !== undefined && value !== null) {
      setUseFilter(true);
      console.log("useFilter");
    }
  };

  // handler function get data from filter priority fields
  const handlerReceiveData = (value: any) => {
    const filter = value.filter(
      (item: any) =>
        item.category === category ||
        item.category === (category && category.replace(/-/g, " "))
    );
    setData(filter);
  };

  // get data from global state redux
  useEffect(() => {
    if (!useFilter) {
      const filter = tasks.filter(
        (item: any) =>
          item.category === category ||
          item.category === (category && category.replace(/-/g, " "))
      );
      setData(filter);
    }
  }, [tasks, useFilter]);

  // update data if there is a trigger on updated title
  useEffect(() => {
    if (isTitleUpdated) {
      const filter = tasks.filter(
        (item: any) =>
          item.category === category ||
          item.category === (category && category.replace(/-/g, " "))
      );
      setData(filter);
    }
    setIsTitleUpdated(false);
  }, [isTitleUpdated]);

  // update data if there is a trigger on updated a task
  useEffect(() => {
    if (updated) {
      const filter = tasks.filter(
        (item: any) =>
          item.category === category ||
          item.category === (category && category.replace(/-/g, " "))
      );
      setData(filter);
    }
    setUpdated(false);
  }, [updated]);

  // update data if there is a trigger on updated completed a task
  useEffect(() => {
    if (updateCompleted) {
      const filter = tasks.filter(
        (item: any) =>
          item.category === category ||
          item.category === (category && category.replace(/-/g, " "))
      );
      setData(filter);
    }
    setUpdateCompleted(false);
  }, [updateCompleted]);

  return (
    <Stack padding={3} width="100%">
      {/* header */}
      <HStack>
        <HStack gap={4} width={"full"}>
          <Heading fontSize={"2xl"} color={primaryTextColor()}>
            {category && category.replace(/-/g, " ")}
          </Heading>
          <ButtonBack />
        </HStack>
        <Spacer />
        <ButtonPriority
          sendData={handlerReceiveData}
          useFilter={handlerUseFilter}
        />
      </HStack>
      {/* filters field */}
      <Stack marginTop={3} width="100%">
        <FiltersField
          sendData={handlerReceiveData}
          resetFilter={handlerResetFilter}
          useFilter={handlerUseFilter}
          useCategory={false}
        />
      </Stack>
      {/* content tasks */}
      <Stack marginTop={3} direction="row" wrap="wrap" spacing={3}>
        {data.map((task: taskInterface, index: number) => (
          <CardTask
            key={index}
            task={task}
            titleUpdated={handleTitleUpdated}
            updated={handlerUpdated}
            updateCompleted={handleUpdateCompleted}
            deleted={handleDelete}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default DetailCategory;
