/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { data } from "@/util/data";
import { taskType } from "@/util/type";

const localData = localStorage.getItem("tasks");
const dataTasks = localData ? JSON.parse(localData) : [];

let initialState = data["list tasks"];

if (dataTasks.length > 0) {
  initialState = dataTasks;
} else {
  initialState = data["list tasks"];
}

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    deleteTask: (state: any, action: any) => {
      state = state.filter((task: any) => task.id !== action.payload);
      localStorage.tasks = JSON.stringify(state);
      return state;
    },
    updateTask: (
      state,
      action: PayloadAction<{ id: string; updatedData: Partial<taskType> }>
    ) => {
      state = state.map((task: any) =>
        task.id === action.payload.id
          ? { ...task, ...action.payload.updatedData }
          : task
      );
      localStorage.tasks = JSON.stringify(state);
      return state;
    },
    createTask: (state, action: PayloadAction<Partial<taskType>>) => {
      const newCategory = action.payload.category;

      // Cek apakah kategori sudah ada dalam data kategori
      const categoryExists = state.some(
        (task) => task.category === newCategory
      );

      if (!categoryExists) {
        // Jika kategori belum ada, tambahkan kategori baru ke data kategori
        const defaultIcon = "BsListTask"; // Ikon default yang sesuai
        const newCategoryData = {
          category: newCategory,
          icon: defaultIcon,
        };
        const existingCategories = JSON.parse(
          localStorage.getItem("categories") || "[]"
        );
        existingCategories.push(newCategoryData);
        localStorage.categories = JSON.stringify(existingCategories);
      }

      const newTask: taskType = {
        id: generateNewTaskId(),
        title: action.payload.title ?? "",
        description: action.payload.description ?? "",
        completed: action.payload.completed ?? false,
        priority: action.payload.priority ?? "rendah",
        category: action.payload.category ?? "",
        customOption: action.payload.customOption ?? "",
        deadline: action.payload.deadline ?? "",
        created: new Date().toISOString(),
        steps: [],
      };
      state.push(newTask);
      localStorage.tasks = JSON.stringify(state);
      return state;
    },
    addStepToTask: (
      state,
      action: PayloadAction<{
        taskId: string;
        step: { id: string; desc: string; completed: boolean };
      }>
    ) => {
      const { taskId, step } = action.payload;
      const newStep = {
        id: generateNewTaskId(),
        desc: step ?? "",
        completed: false,
      };
      const updatedState = state.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            steps: [...task.steps, newStep],
          };
        }
        return task;
      });

      localStorage.setItem("tasks", JSON.stringify(updatedState));
      return updatedState;
    },
    updateStepCompleted: (
      state,
      action: PayloadAction<{
        taskId: string;
        stepId: string;
        completed: boolean;
      }>
    ) => {
      const { taskId, stepId, completed } = action.payload;

      state = state.map((task) => {
        if (task.id === taskId) {
          const updatedSteps = task.steps.map((step) => {
            if (step.id === stepId) {
              return { ...step, completed };
            }
            return step;
          });
          return { ...task, steps: updatedSteps };
        }
        return task;
      });

      localStorage.setItem("tasks", JSON.stringify(state));
      return state;
    },
    deleteStepFromTask: (
      state,
      action: PayloadAction<{ taskId: string; stepId: string }>
    ) => {
      const { taskId, stepId } = action.payload;

      state = state.map((task) => {
        if (task.id === taskId) {
          const updatedSteps = task.steps.filter((step) => step.id !== stepId);
          return { ...task, steps: updatedSteps };
        }
        return task;
      });

      localStorage.setItem("tasks", JSON.stringify(state));
      return state;
    },
  },
});

const generateNewTaskId = () => {
  const currentDate = new Date();
  const timestamp = currentDate.getTime(); // Current timestamp in milliseconds
  const randomChars = Math.random().toString(36).substring(2, 8); // Random characters

  return `${timestamp}${randomChars}`;
};

export const selectTasks = (state: any) => state.tasks;
export const countTask = (tasks: any[]) => {
  const today = new Date();

  return tasks.filter((task: any) => {
    const taskDeadline = new Date(task.deadline);
    return (
      taskDeadline.getDate() === today.getDate() &&
      taskDeadline.getMonth() === today.getMonth() &&
      taskDeadline.getFullYear() === today.getFullYear()
    );
  }).length;
};

export const selectTaskById = (state: any, id: number) =>
  state.tasks.find((task: any) => task.id === id);

export const {
  deleteTask,
  updateTask,
  createTask,
  addStepToTask,
  updateStepCompleted,
  deleteStepFromTask,
} = taskSlice.actions;

export default taskSlice.reducer;
