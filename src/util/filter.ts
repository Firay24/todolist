// import { selectTasks } from "@/redux/taskSlice";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const advanceFilter = (props: { data: any; filterQuery: any }) => {
  const result = props.data.filter(function (row) {
    return eval(props.filterQuery);
  });
  return result;
};

const filterFeature = (props: { data: any; criteria: string; value: any }) => {
  // const localData = localStorage.getItem("tasks");
  // const data = localData ? JSON.parse(localData) : selectTasks;
  // if criteria is completed, convert type data string to boolean
  if (props.criteria === "completed") {
    if (props.value.length === 0) {
      return props.data;
    }
    const result = props.data.filter((item: any) =>
      props.value.includes(item[props.criteria])
    );
    return result;
  }

  // filter function
  const result = props.data.filter((item: any) => {
    return props.value.includes(item[props.criteria]);
  });

  if (props.value.length === 0) {
    return props.data;
  }

  return result;
};

export default filterFeature;
