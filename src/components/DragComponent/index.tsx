// import library used
import { useState, useEffect } from "react";
import { DndContext, rectIntersection } from "@dnd-kit/core"; // library drag and drop
import { Stack } from "@chakra-ui/react";

//Components
import LaneCard from "./laneCard";
import { updateTask } from "@/redux/taskSlice";
import { useDispatch } from "react-redux";

function DragComponentSection(props: {
  data: any;
  titleUpdated: any;
  updated: any;
  updateCompleted: any;
  deleted: any;
  layout: string;
}) {
  const dispatch = useDispatch();
  // state all task
  const [allTaks, setAllTaks] = useState([]);

  //Kanban lanes will recieve filtered lists from useEffect below
  const [laneDoingItems, setLaneDoingItems] = useState([]);
  const [laneDoneItems, setLaneDoneItems] = useState([]);

  //Get data from parent
  useEffect(() => {
    setAllTaks(props.data);
  }, [props.data]);

  //This function compares the category property from the individual tasks to the tasks Lane Ids
  //The indivdual task that was dragged will then have its lineId property to the new lane
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    const sourceCategory = active.data.current.category;
    const destinationCategory = over.id;

    if (sourceCategory !== destinationCategory) {
      const localData = localStorage.getItem("tasks") || "";
      const parsedLocalData = allTaks ? JSON.parse(localData) : [];
      const updateCompleted = {
        completed: destinationCategory === "done",
      };
      const taskIndex = parsedLocalData.findIndex(
        (task: any) => task.id === active.id
      );
      parsedLocalData[taskIndex] = {
        ...parsedLocalData[taskIndex],
        ...updateCompleted,
      };
      const { id, ...newData } = parsedLocalData[taskIndex];
      dispatch(updateTask({ id: id, updatedData: newData }));
    }
  };

  //Second useEffect fires everytime allItems list changes, to filter lane lists.
  useEffect(() => {
    setLaneDoingItems(() => allTaks.filter((item: any) => !item.completed));
    setLaneDoneItems(() => allTaks.filter((item: any) => item.completed));
  }, [allTaks]);

  return (
    <DndContext collisionDetection={rectIntersection} onDragEnd={handleDragEnd}>
      <Stack
        direction={{ base: "column", lg: "row" }}
        spacing={5}
        justifyContent="center"
        minHeight="30rem"
        width={"100%"}
        flex="1"
        marginTop={4}
      >
        <Stack flex="1">
          <LaneCard
            laneId="doing"
            title="Doing"
            tasks={laneDoingItems}
            titleUpdated={props.titleUpdated}
            updated={props.updated}
            updateCompleted={props.updateCompleted}
            deleted={props.deleted}
            layout={props.layout}
          />
        </Stack>
        <Stack flex="1">
          <LaneCard
            laneId="done"
            title="Done"
            tasks={laneDoneItems}
            titleUpdated={props.titleUpdated}
            updated={props.updated}
            updateCompleted={props.updateCompleted}
            deleted={props.deleted}
            layout={props.layout}
          />
        </Stack>
      </Stack>
    </DndContext>
  );
}

export default DragComponentSection;
