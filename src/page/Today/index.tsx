// import library used
import { HStack, Heading, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

// import global state from redux
import { useDispatch, useSelector } from "react-redux";
import { selectTasks } from "@/redux/taskSlice";
import { updateCountTaskOnToday } from "@/redux/todaySlice";

// import global style
import { primaryTextColor, secondaryColor } from "@/components/styles";

// import component used
import ButtonPriority from "@/components/ButtonPriority";
import CardTask from "@/components/CardTask";
import FiltersField from "@/components/Filter";
import NullContent from "@/components/NullContent";

interface taskInterface {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: string;
  category: string;
}

const TodayPage = () => {
  // tasks data
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();
  const [data, setData] = useState<taskInterface[]>([]);
  const [countTaskOnToday, setCountTaskOnToday] = useState(0);

  // state to trigger the effects of data and filter changes
  const [isTitleUpdated, setIsTitleUpdated] = useState<boolean>(false);
  const [updated, setUpdated] = useState(false);
  const [updateCompleted, setUpdateCompleted] = useState(false);
  const [useFilter, setUseFilter] = useState(false);

  // handler function get data from filter priority fields
  const handlerReceiveData = (value: any) => {
    if (value !== "" && value !== undefined && value !== null) {
      const filteredTasks = value.filter((item) => {
        const deadlineDate = new Date(item.deadline);
        return isToday(deadlineDate);
      });
      setData(filteredTasks);
      setCountTaskOnToday(filteredTasks.length);
    }
  };

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

  // handler reset filter, to notify that the filter is not in use
  const handlerResetFilter = (value: any) => {
    setUseFilter(!value);
  };

  // handler reset filter, to notify that the filter is using
  const handlerUseFilter = (value: any) => {
    if (value !== "" && value !== undefined && value !== null) {
      setUseFilter(true);
    }
  };

  // function to convert new Date today to indonesian date format
  const getToday = () => {
    const today = new Date();
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formattedDate = today.toLocaleDateString("id-ID", options);
    return formattedDate;
  };

  // update data if there is a change in task
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // get data from global state redux
  useEffect(() => {
    if (!useFilter) {
      const filteredTasks = tasks.filter((item) => {
        const deadlineDate = new Date(item.deadline);
        return isToday(deadlineDate);
      });
      setData(filteredTasks);
      setCountTaskOnToday(filteredTasks.length);
    }
  }, [tasks, useFilter]);

  // return data from filter result
  useEffect(() => {
    const filteredTasks = tasks.filter((item) => {
      const deadlineDate = new Date(item.deadline);
      return isToday(deadlineDate);
    });

    setData(filteredTasks);
    setCountTaskOnToday(filteredTasks.length);
  }, [tasks]);

  // update data if there is a trigger on updated title
  useEffect(() => {
    if (isTitleUpdated) {
      const filteredTasks = tasks.filter((item) => {
        const deadlineDate = new Date(item.deadline);
        return isToday(deadlineDate);
      });
      setData(filteredTasks);
      setCountTaskOnToday(filteredTasks.length);
    }
    setIsTitleUpdated(false);
  }, [isTitleUpdated]);

  // update data if there is a trigger on updated a task
  useEffect(() => {
    if (updated) {
      const filteredTasks = tasks.filter((item) => {
        const deadlineDate = new Date(item.deadline);
        return isToday(deadlineDate);
      });
      setData(filteredTasks);
      setCountTaskOnToday(filteredTasks.length);
    }
    setUpdated(false);
  }, [updated]);

  // update data if there is a trigger on updated completed a task
  useEffect(() => {
    if (updateCompleted) {
      const filteredTasks = tasks.filter((item) => {
        const deadlineDate = new Date(item.deadline);
        return isToday(deadlineDate);
      });
      setData(filteredTasks);
      setCountTaskOnToday(filteredTasks.length);
    }
    setUpdateCompleted(false);
  }, [updateCompleted]);

  return (
    <Stack padding={3} width="100%">
      {/* header component */}
      <Stack width={"100%"}>
        <HStack>
          <Stack width={"full"}>
            <Heading fontSize={"2xl"} color={primaryTextColor()}>
              Welcome Back, Fira
            </Heading>
            <Text color={secondaryColor()} fontSize={"sm"}>
              {getToday()}
            </Text>
          </Stack>
          <ButtonPriority
            sendData={handlerReceiveData}
            useFilter={handlerUseFilter}
          />
        </HStack>
      </Stack>

      {/* filters field */}
      <Stack marginTop={3} width="100%">
        <FiltersField
          sendData={handlerReceiveData}
          resetFilter={handlerResetFilter}
          useFilter={handlerUseFilter}
          useCategory={false}
        />
      </Stack>

      {/* cards component */}
      <Stack marginTop={3} direction="row" wrap="wrap" spacing={3}>
        {data.length > 0 ? (
          data.map((task: taskInterface, index: number) => (
            <CardTask
              key={index}
              task={task}
              titleUpdated={handleTitleUpdated}
              updated={handlerUpdated}
              updateCompleted={handleUpdateCompleted}
              deleted={handleDelete}
              layout="grid"
            />
          ))
        ) : (
          <NullContent />
        )}
      </Stack>
    </Stack>
  );
};

export default TodayPage;
