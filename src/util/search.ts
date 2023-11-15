/* eslint-disable @typescript-eslint/no-explicit-any */
import { selectTasks } from "@/redux/taskSlice";

const localData = localStorage.getItem("tasks");
const data = localData ? JSON.parse(localData) : selectTasks;

const searchFeature = (props: { term: any }) => {
  // if term or search input return empty string, return original data
  if (props.term === "") {
    return data;
  }

  // function search by anything (title, description and category)
  const result = data.filter(
    (item: any) =>
      item.title.toLowerCase().includes(props.term.toLowerCase()) ||
      item.description.toLowerCase().includes(props.term.toLowerCase()) ||
      item.category.toLowerCase().includes(props.term.toLowerCase())
  );
  return result;
};

export default searchFeature;
