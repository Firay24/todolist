import Papa from "papaparse";

export const convertToCSV = (objArray: any) => {
  const csv = Papa.unparse(objArray);
  return csv;
};

const downloadCSV = (data: any) => {
  const csvData = new Blob([data], { type: "text/csv" });
  const csvURL = window.URL.createObjectURL(csvData);
  const tempLink = document.createElement("a");
  tempLink.href = csvURL;
  tempLink.setAttribute("download", "tasks.csv");
  tempLink.click();
};

export default downloadCSV;
