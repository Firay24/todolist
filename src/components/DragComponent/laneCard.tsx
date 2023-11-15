// import libray used
import { Heading, Stack } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

// import component used
import CardTask from "../CardTask";

// import global styles
import {
  backgroundContainer,
  backgroundContainer2,
  primaryTextColor,
} from "../styles";

export default function LaneCard(props: {
  laneId: string;
  tasks: any;
  title: string;
  titleUpdated: any;
  updated: any;
  updateCompleted: any;
  deleted: any;
  layout: string;
}) {
  //By setting the id property here and passing setNodeRef to the container below
  //It is possible to compare the id of this droppable element to the categories of the tasks being dragged onto it.
  const { setNodeRef } = useDroppable({
    id: props.laneId,
  });

  return (
    <SortableContext items={props.tasks} strategy={verticalListSortingStrategy}>
      <Stack
        minH={{ base: "4rem", lg: "30rem" }}
        rounded="md"
        backgroundColor={backgroundContainer()}
        ref={setNodeRef}
        borderColor="gray.200"
        shadow="lg"
        width={"full"}
        alignItems={"center"}
        paddingBottom={3}
      >
        <Heading
          fontSize="xl"
          fontWeight="semibold"
          color={primaryTextColor()}
          textAlign="center"
          backgroundColor={backgroundContainer2()}
          width={"full"}
          padding={3}
          marginBottom={2}
          roundedTop="md"
        >
          {props.title}
        </Heading>

        {/* cards sections */}
        {props.tasks.map((task: any, index: number) => (
          <CardTask
            key={index}
            task={task}
            id={task.id}
            category={props.laneId}
            titleUpdated={props.titleUpdated}
            updated={props.updated}
            updateCompleted={props.updateCompleted}
            deleted={props.deleted}
            layout={props.layout}
          />
        ))}
      </Stack>
    </SortableContext>
  );
}
