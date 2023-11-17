import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { uniqueValues } from "../util/service";
import { useSelector } from "react-redux";
import { selectTasks } from "@/redux/taskSlice";
import { useEffect, useState } from "react";

const ListFilter = (props: { name: string }) => {
  const tasks = useSelector(selectTasks);
  const [criteriaValue, setCriteriaValue] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (value: any) => {
    if (selectedOptions.includes(value)) {
      // Uncheck the checkbox and remove the value from the selectedItems array
      setSelectedOptions(selectedOptions.filter((item) => item !== value));
    } else {
      // Check the checkbox and add the value to the selectedItems array
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  useEffect(() => {
    const data = uniqueValues({ data: tasks, criteria: props.name });
    setCriteriaValue(data);
  }, [tasks]);

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            {props.name}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <RadioGroup>
          <Stack>
            {criteriaValue &&
              criteriaValue.map((item: any, index: number) => (
                <Checkbox
                  key={index}
                  isChecked={selectedOptions.includes(item)}
                  onChange={() => handleCheckboxChange(item)}
                >
                  {props.name === "completed"
                    ? item
                      ? "Done"
                      : "Doing"
                    : item}
                </Checkbox>
                // <Radio value={item}>{item}</Radio>
              ))}
          </Stack>
        </RadioGroup>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default ListFilter;
