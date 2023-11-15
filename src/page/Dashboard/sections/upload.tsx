/* eslint-disable @typescript-eslint/no-explicit-any */

// import style library used
import { Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

// function for convert csv file format to json format
import Papa from "papaparse";

// import redux state and action
import { useDispatch } from "react-redux";
import { createTask } from "@/redux/taskSlice";
import { Stack } from "@chakra-ui/react";

const parseCSV = (csvContent: any) => {
  // convert csv >> json
  const results = Papa.parse(csvContent, { header: true });

  // create a data format from csv file
  const jsonFormatData = results.data.map((csvRow: any) => {
    return {
      title: csvRow.title || "",
      description: csvRow.description || "",
      completed: false,
      priority: csvRow.priority || "",
      category: csvRow.category || "",
    };
  });
  return jsonFormatData;
};

// component upload
const UploadComponent = () => {
  const dispatch = useDispatch();

  // handler function when user click upload button
  const handleUpload = (file: any) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const content = e.target.result;
      const jsonData = parseCSV(content);

      // create task from jsonData from parseCSV
      jsonData.map((item: any) => {
        if (item.title && item.priority && item.description && item.category) {
          dispatch(createTask(item));
        }
      });

      // notification from ant design
      message.success("Berhasil diunggah");
    };
    reader.readAsText(file);
  };

  return (
    <Stack>
      <Upload
        customRequest={({ file }) => handleUpload(file)}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>Upload file</Button>
      </Upload>
    </Stack>
  );
};

export default UploadComponent;
