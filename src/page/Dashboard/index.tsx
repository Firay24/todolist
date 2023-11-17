/* eslint-disable @typescript-eslint/no-explicit-any */

// import library used
import {
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";

// import global state from redux flow
import { useSelector } from "react-redux";
import { selectTasks } from "@/redux/taskSlice";

// import component
import ButtonPriority from "@/components/ButtonPriority";
import CardTask from "@/components/CardTask";
import ButtonExport from "@/components/ButtonExport";
import FiltersField from "@/components/Filter";
import DragComponent from "./sections/drag";
import DragComponentSection from "@/components/DragComponent";
import NotificationConfirmation from "@/components/NotifConfirm";
import SearchOnInput from "@/components/Filter/sections/SearchOnInput";
import ModalFilter from "@/components/ModalFilter";

// import style global component from components folder
import {
  backgroundColorHover2,
  backgroundContainer,
  backgroundContainer2,
  primaryTextColor,
  secondaryColor,
} from "@/components/styles";

// import icons from react-icons
import { LuLayoutGrid, LuLayoutPanelTop } from "react-icons/lu";
import { MdFilterAlt } from "react-icons/md";
import { notifyUser, scheduleTaskNotifications } from "@/util/notif";
import searchFeature from "@/util/search";

// task interface data type
interface taskInterface {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: string;
  category: string;
}

// layout context state
export const LayoutContext: any = createContext(null);

const Dashboard = () => {
  const tasks = useSelector(selectTasks);

  // tasks data
  const [data, setData] = useState<taskInterface[]>([]);
  const [isTitleUpdated, setIsTitleUpdated] = useState<boolean>(false);
  const [useFilter, setUseFilter] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [updateCompleted, setUpdateCompleted] = useState(false);
  const [deleted, setDeleted] = useState(false);

  // state and handle onChange layout of tasks
  const [layout, setLayout] = useState(
    localStorage.currentLayout ? localStorage.currentLayout : "panel"
  );

  // function to handler swith layout on button
  const switchLayout = (value: string) => {
    setLayout(value);
    localStorage.currentLayout = value;
  };

  // state notification
  const [userResponded, setUserResponded] = useState(false);

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

  // handler function get data from filter priority fields
  const handlerReceiveData = (value: any) => {
    if (value !== "" && value !== undefined && value !== null) {
      setData(value);
    }
  };

  // handler function to reset all rule filter
  const handlerResetFilter = (value: any) => {
    setUseFilter(!value);
  };

  // handler to receive, this page used filter feature
  const handlerUseFilter = (value: any) => {
    if (value !== "" && value !== undefined && value !== null) {
      setUseFilter(true);
    }
  };

  // handler deleted rule filter
  const handleDelete = (value: any) => {
    if (value !== "" && value !== undefined && value !== null) {
      setUseFilter(false);
      setDeleted(true);
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

  // handle to receive, handle updated completed
  const handleUpdateCompleted = (value: any) => {
    setUpdateCompleted(value);
  };

  // handle to receive, confirm notification from user
  const handleConfirmNotif = (value: any) => {
    setUserResponded(value);
  };

  // handler to receive if done deketed
  const handlerStatusDeleted = (value: any) => {
    setDeleted(value);
  };

  // handler receive result
  const handleSearch = (value: any) => {
    const result = searchFeature({ term: value });
    if (value) {
      setData(result);
      setUseFilter(true);
    }
  };

  // get data from global state redux
  useEffect(() => {
    if (!useFilter) {
      setData(tasks);
    }
  }, [tasks, useFilter]);

  // return data, title update
  useEffect(() => {
    if (isTitleUpdated) {
      setData(tasks);
    }
    setIsTitleUpdated(false);
  }, [isTitleUpdated]);

  // return data, update set data
  useEffect(() => {
    if (updated) {
      setData(tasks);
    }
    setUpdated(false);
  }, [updated]);

  // return data, task changed
  useEffect(() => {
    if (!useFilter) {
      setData(tasks);
    }
    scheduleTaskNotifications({ tasks: tasks });
  }, [tasks]);

  // return data, if completed changed
  useEffect(() => {
    if (updateCompleted) {
      setData(tasks);
    }
    setUpdateCompleted(false);
  }, [updateCompleted]);

  // if user confirm notification, send notif to say thanks
  useEffect(() => {
    if (userResponded) {
      notifyUser();
    }
  }, [userResponded]);

  return (
    <>
      <LayoutContext.Provider value={{ layout, switchLayout }}>
        <Stack
          padding={3}
          width="full"
          minHeight={{ base: "200vh", md: "100vh" }}
        >
          {/* header dasboard page */}
          <Stack width="100%">
            <Flex
              direction={{ base: "column", md: "row" }}
              alignItems={{ base: "flex-start", md: "center" }}
              justifyContent={{ base: "flex-start", md: "flex-end" }}
              gap={4}
            >
              <Stack gap={1} marginLeft={{ base: 8, md: 0 }}>
                <Heading
                  fontSize={{ base: "xl", md: "2xl" }}
                  color={primaryTextColor()}
                >
                  Welcome Back, Fira
                </Heading>
                <Text
                  color={secondaryColor()}
                  fontSize={{ base: "xs", md: "sm" }}
                >
                  {getToday()}
                </Text>
              </Stack>

              <Stack spacing={2} width={"full"}>
                <Stack display={"flex"} flexDirection={"row"}>
                  <ButtonPriority
                    sendData={handlerReceiveData}
                    useFilter={handlerUseFilter}
                    deleted={deleted}
                    statusDeleted={handlerStatusDeleted}
                  />
                  <ModalFilter
                    handlerReceiveData={handlerReceiveData}
                    handlerResetFilter={handlerResetFilter}
                    handlerUseFilter={handlerUseFilter}
                  />
                  {/* <Button
                    size={"sm"}
                    color={primaryTextColor()}
                    backgroundColor={backgroundContainer()}
                  >
                    <MdFilterAlt />
                  </Button> */}
                </Stack>
                <Stack marginTop={2}>
                  <SearchOnInput sendValue={handleSearch} />
                </Stack>
                {/* <HStack>
                  <DragComponent />
                  <ButtonExport data={data} />
                </HStack> */}
              </Stack>
            </Flex>
            {/* <Grid templateColumns="repeat(10, 1fr)">
              <GridItem colSpan={3}>
                <Stack gap={1}>
                  <Heading fontSize={"2xl"} color={primaryTextColor()}>
                    Welcome Back, Fira
                  </Heading>
                  <Text color={secondaryColor()} fontSize={"sm"}>
                    {getToday()}
                  </Text>
                </Stack>
              </GridItem>
              <GridItem
                colSpan={7}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={5}
              >
                <ButtonPriority
                  sendData={handlerReceiveData}
                  useFilter={handlerUseFilter}
                  deleted={deleted}
                  statusDeleted={handlerStatusDeleted}
                />
                <DragComponent />

                <UploadComponent />
                <ButtonExport data={data} />
              </GridItem>
            </Grid> */}
          </Stack>

          {/* filter fields */}
          {/* <Stack marginTop={3} width="100%">
            <FiltersField
              sendData={handlerReceiveData}
              resetFilter={handlerResetFilter}
              useFilter={handlerUseFilter}
              useCategory={true}
            />
          </Stack> */}

          {/* card content */}
          <HStack alignItems={"start"}>
            <Stack width={"full"}>
              {layout === "panel" ? (
                <DragComponentSection
                  data={data}
                  titleUpdated={handleTitleUpdated}
                  updated={handlerUpdated}
                  updateCompleted={handleUpdateCompleted}
                  deleted={handleDelete}
                  layout={layout}
                />
              ) : (
                <Stack
                  marginTop={3}
                  direction="row"
                  wrap="wrap"
                  width={"full"}
                  spacing={3}
                  justify={"space-between"}
                >
                  {data.map((task: taskInterface, index: number) => (
                    <CardTask
                      key={index}
                      task={task}
                      titleUpdated={handleTitleUpdated}
                      updated={handlerUpdated}
                      updateCompleted={handleUpdateCompleted}
                      deleted={handleDelete}
                      layout={layout}
                    />
                  ))}
                </Stack>
              )}
            </Stack>

            {/* option to choose layout */}
            {/* <Stack
              backgroundColor={backgroundContainer()}
              padding={4}
              rounded={"md"}
              color={primaryTextColor()}
              gap={3}
              marginTop={4}
              width={"8%"}
              marginLeft={3}
            >
              <Button
                color={primaryTextColor()}
                backgroundColor={backgroundContainer2()}
                onClick={() => switchLayout("grid")}
                _hover={{ backgroundColor: backgroundColorHover2() }}
              >
                <LuLayoutGrid />
              </Button>
              <Button
                color={primaryTextColor()}
                backgroundColor={backgroundContainer2()}
                onClick={() => switchLayout("panel")}
                _hover={{ backgroundColor: backgroundColorHover2() }}
              >
                <LuLayoutPanelTop />
              </Button>
            </Stack> */}
          </HStack>
        </Stack>

        {/* notification section */}
        {!userResponded && !(Notification.permission === "granted") ? (
          <NotificationConfirmation confirmNotif={handleConfirmNotif} />
        ) : Notification.permission === "granted" ? (
          <Stack></Stack>
        ) : (
          <Text>You have disabled notifications </Text>
        )}
      </LayoutContext.Provider>
    </>
  );
};

export default Dashboard;
