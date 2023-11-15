/* eslint-disable @typescript-eslint/no-explicit-any */
import { selectTasks } from "@/redux/taskSlice";

// Fungsi untuk mengubah string tanggal ke objek Date
// const parseDateString = (dateString: string) => {
//   const dateParts = dateString.split("T")[0].split("-");
//   const year = parseInt(dateParts[0]);
//   const month = parseInt(dateParts[1]) - 1; // Bulan dimulai dari 0 (Januari)
//   const day = parseInt(dateParts[2]);
//   return new Date(year, month, day);
// };

export const filterAbjad = (props: { value: any }) => {
  const localData = localStorage.getItem("tasks");
  const data = localData ? JSON.parse(localData) : selectTasks;

  if (props.value === "az") {
    const result = data.sort((a: any, b: any) =>
      a.title.localeCompare(b.title)
    );

    return result;
  } else if (props.value === "za") {
    const result = data.sort((a: any, b: any) =>
      b.title.localeCompare(a.title)
    );

    return result;
  } else if (props.value === "") {
    return data;
  }
};

export const filterByDeadline = (props: { data: any; value: string }) => {
  console.log(props.data, props.value);
  // Buat salinan data sebelum mengurutkannya
  const dataCopy = [...props.data];
  const result = dataCopy.sort((a, b) => {
    const dateA = new Date(a.deadline);
    const dateB = new Date(b.deadline);
    if (props.value === "Nearest") {
      return dateA - dateB;
    }

    if (props.value === "Furthest") {
      return dateB - dateA;
    }

    return 0;
  });
  return result;
};
