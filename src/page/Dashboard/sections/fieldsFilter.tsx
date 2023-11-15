/* eslint-disable @typescript-eslint/no-explicit-any */

// import library used
import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Grid,
  GridItem,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";

// import funtion from utils
import filterFeature from "@/util/filter";
import searchFeature from "@/util/search";
import { filterAbjad, filterByDeadline } from "@/util/sort";

// import component used
import SearchInput from "./searchInput";
import {
  backgroundColorHover,
  backgroundContainer,
  backgroundContainer2,
  primaryTextColor,
  secondaryColor,
} from "@/components/styles";

// import icon from react-icons
import { FaTrash } from "react-icons/fa";
import { GoSortDesc } from "react-icons/go";
import {
  BsSortAlphaDown,
  BsSortAlphaDownAlt,
  BsAppIndicator,
  BsCalendarCheck,
} from "react-icons/bs";
import { AiOutlineFilter } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { TbProgressCheck } from "react-icons/tb";
import { useSelector } from "react-redux";
import { selectTasks } from "@/redux/taskSlice";

const FieldsFilter = (props: {
  sendData: any;
  resetFilter: any;
  useFilter: any;
}) => {
  // tasks data
  const [data, setData] = useState([]);
  const tasks = useSelector(selectTasks);

  // state popup sort
  const [isOpen, setIsOpen] = useState({
    sort: false,
    filter: false,
    value: false,
  });
  const [sort, setSort] = useState("sort");
  const [isSort, setIsSort] = useState(false);

  // satte to filter feature for criteria custom and it's value
  const [criteria, setCriteria] = useState("");
  const [valueCri, setValueCri] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // handler function to filter by custom criteria and value by criteria
  const handlerFilter = (props: { criteria: any; value: any }) => {
    const result = filterFeature({
      data: tasks,
      criteria: props.criteria,
      value: props.value,
    });
    setData(result);
    onClose("value");
  };

  // handler function to search feature
  const handleSearch = (value: any) => {
    const result = searchFeature({ term: value });
    if (value) {
      setData(result);
      props.useFilter(true);
    }
  };

  // handler function sort feature
  const handleSort = (value: string) => {
    const result = filterAbjad({ value: value });
    setSort(value === "az" ? "A-Z" : "Z-A");
    if (value) {
      setData(result);
      props.useFilter(true);
      onClose("sort");
    }
  };

  const handlerSortDeadline = () => {
    const result = filterByDeadline(data);
    setData(result);
    setIsSort(true);
    props.useFilter(true);
    onClose("sort");
  };

  // handler checkbox selected item
  const handleCheckboxChange = (value: any) => {
    if (selectedOptions.includes(value)) {
      // Uncheck the checkbox and remove the value from the selectedItems array
      setSelectedOptions(selectedOptions.filter((item) => item !== value));
    } else {
      // Check the checkbox and add the value to the selectedItems array
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  // function to handler status popup
  const onOpen = (type: string) => {
    if (type === "sort") {
      setIsOpen((prevState: any) => ({
        ...prevState,
        sort: true,
      }));
    } else if (type === "filter") {
      setIsOpen((prevState: any) => ({
        ...prevState,
        filter: true,
      }));
    } else if (type === "value") {
      setIsOpen((prevState: any) => ({
        ...prevState,
        value: true,
      }));
    }
  };

  // function to handler status popup
  const onClose = (type: string) => {
    if (type === "sort") {
      setIsOpen((prevState: any) => ({
        ...prevState,
        sort: false,
      }));
    } else if (type === "filter") {
      setIsOpen((prevState: any) => ({
        ...prevState,
        filter: false,
      }));
    } else if (type === "value") {
      setIsOpen((prevState: any) => ({
        ...prevState,
        value: false,
      }));
    }
  };

  // handler to clear a filter
  const clearFilters = () => {
    const originalData = JSON.parse(localStorage.tasks);
    setData(originalData);
    setCriteria("");
    setValueCri([]);
    setSort("sort");
    setSelectedOptions([]);
    props.resetFilter(true);
  };

  // get unique category for filter criteria
  useEffect(() => {
    const uniqueValues = [...new Set(data.map((item) => item[criteria]))];
    setValueCri(uniqueValues);
    if (criteria !== "") {
      props.useFilter(true);
    }
  }, [criteria]);

  useEffect(() => {
    props.sendData(data);
  }, [data]);

  useEffect(() => {
    if (isSort) {
      props.sendData(data);
      setIsSort(false);
    }
  }, [isSort]);

  // send default original data b'cause empty filter return dashboard page empty array
  useEffect(() => {
    setData(JSON.parse(localStorage.tasks));
  }, []);

  // filter if the user chooses to change the filter by criteria and value
  useEffect(() => {
    if (criteria) {
      handlerFilter({
        criteria: criteria,
        value: selectedOptions,
      });
    }
    if (selectedOptions.length > 0) {
      onOpen("value");
    }
  }, [criteria, selectedOptions]);

  useEffect(() => {
    if (criteria !== "") {
      handlerFilter({
        data: tasks,
        criteria: criteria,
        value: selectedOptions,
      });
    }
  }, [tasks]);

  return (
    <Stack
      width="100%"
      backgroundColor={backgroundContainer()}
      padding={3}
      boxShadow={"sm"}
      rounded={"md"}
    >
      <Text fontSize={"sm"} color={secondaryColor()} fontWeight={"medium"}>
        Filter fields
      </Text>
      <HStack>
        <Stack width="auto">
          <SearchInput sendValue={handleSearch} />
        </Stack>
        <Spacer />
        <Stack>
          <HStack gap={3}>
            <Grid
              display={"flex"}
              alignItems={"center"}
              gap={2}
              minWidth={"200px"}
            >
              <GridItem minWidth={"fit-content"}>
                <Text fontSize={"sm"} color={secondaryColor()}>
                  Filter By
                </Text>
              </GridItem>
              <GridItem width={"100%"}>
                <Popover
                  isOpen={isOpen.filter}
                  onOpen={() => onOpen("filter")}
                  onClose={() => onClose("filter")}
                >
                  <PopoverTrigger>
                    <Button
                      gap={2}
                      variant="ghost"
                      bg="transparent"
                      border={"1px"}
                      size={"sm"}
                      borderColor={backgroundContainer2()}
                      backgroundColor={backgroundContainer()}
                      color={primaryTextColor()}
                      _hover={{ backgroundColor: backgroundColorHover() }}
                      width={"100%"}
                    >
                      {criteria === "" ? (
                        <AiOutlineFilter />
                      ) : criteria === "category" ? (
                        <BiCategoryAlt />
                      ) : criteria === "priority" ? (
                        <BsAppIndicator />
                      ) : (
                        <TbProgressCheck />
                      )}
                      <Text fontWeight={"medium"} fontSize={"sm"}>
                        {criteria === "" ? "Filter" : criteria}
                      </Text>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    width={"100%"}
                    backgroundColor={backgroundContainer()}
                  >
                    <PopoverArrow />
                    <PopoverBody>
                      <Stack>
                        <Button
                          justifyContent={"start"}
                          onClick={() => {
                            setCriteria("category");
                            onClose("filter");
                          }}
                          gap={2}
                          backgroundColor={"transparent"}
                          color={primaryTextColor()}
                          _hover={{ backgroundColor: backgroundColorHover() }}
                        >
                          <BiCategoryAlt />
                          <Text fontWeight={"medium"} fontSize={"14px"}>
                            Category
                          </Text>
                        </Button>
                        <Button
                          justifyContent={"start"}
                          onClick={() => {
                            setCriteria("priority");
                            onClose("filter");
                          }}
                          gap={2}
                          backgroundColor={"transparent"}
                          color={primaryTextColor()}
                          _hover={{ backgroundColor: backgroundColorHover() }}
                        >
                          <BsAppIndicator />
                          <Text fontWeight={"medium"} fontSize={"14px"}>
                            Priority
                          </Text>
                        </Button>
                        <Button
                          justifyContent={"start"}
                          onClick={() => {
                            setCriteria("completed");
                            onClose("filter");
                          }}
                          gap={2}
                          backgroundColor={"transparent"}
                          color={primaryTextColor()}
                          _hover={{ backgroundColor: backgroundColorHover() }}
                        >
                          <TbProgressCheck />
                          <Text fontWeight={"medium"} fontSize={"14px"}>
                            Progress
                          </Text>
                        </Button>
                      </Stack>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </GridItem>
            </Grid>
            <Grid
              display={"flex"}
              alignItems={"center"}
              gap={2}
              minWidth={"200px"}
            >
              <GridItem minWidth={"fit-content"}>
                <Text fontSize={"sm"} color={secondaryColor()}>
                  Value
                </Text>
              </GridItem>
              <GridItem width={"100%"}>
                <Popover
                  isOpen={isOpen.value}
                  onOpen={() => onOpen("value")}
                  onClose={() => onClose("value")}
                >
                  <PopoverTrigger>
                    <Button
                      gap={2}
                      isDisabled={criteria === "" ? true : false}
                      variant="ghost"
                      bg="transparent"
                      border={"1px"}
                      size={"sm"}
                      borderColor={backgroundContainer2()}
                      backgroundColor={backgroundContainer()}
                      color={primaryTextColor()}
                      _hover={{ backgroundColor: backgroundColorHover() }}
                      width={"100%"}
                    >
                      <GoSortDesc />
                      <Text fontWeight={"medium"} fontSize={"sm"}>
                        Value
                      </Text>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    width={"100%"}
                    backgroundColor={backgroundContainer()}
                  >
                    <PopoverArrow />
                    <PopoverBody maxH="200px" overflowY="auto">
                      <Stack>
                        {valueCri.map((item, index) => (
                          <Checkbox
                            key={index}
                            isChecked={selectedOptions.includes(item)}
                            onChange={() => handleCheckboxChange(item)}
                          >
                            {criteria === "completed"
                              ? item
                                ? "Done"
                                : "Doing"
                              : item}
                          </Checkbox>
                        ))}
                      </Stack>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </GridItem>
            </Grid>
            <Grid
              display={"flex"}
              alignItems={"center"}
              gap={2}
              minWidth={"150px"}
            >
              <GridItem minWidth={"fit-content"}>
                <Text fontSize={"sm"} color={secondaryColor()}>
                  Sort By
                </Text>
              </GridItem>
              <GridItem width={"100%"}>
                <Popover
                  isOpen={isOpen.sort}
                  onOpen={() => onOpen("sort")}
                  onClose={() => onClose("sort")}
                >
                  <PopoverTrigger>
                    <Button
                      gap={2}
                      variant="ghost"
                      bg="transparent"
                      border={"1px"}
                      size={"sm"}
                      borderColor={backgroundContainer2()}
                      backgroundColor={backgroundContainer()}
                      color={primaryTextColor()}
                      _hover={{ backgroundColor: backgroundColorHover() }}
                      width={"100%"}
                    >
                      <GoSortDesc />
                      <Text fontWeight={"medium"} fontSize={"sm"}>
                        {sort}
                      </Text>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    width={"100%"}
                    backgroundColor={backgroundContainer()}
                  >
                    <PopoverArrow />
                    <PopoverBody>
                      <Stack>
                        <Button
                          onClick={() => handleSort("az")}
                          gap={2}
                          backgroundColor={"transparent"}
                          color={primaryTextColor()}
                          _hover={{ backgroundColor: backgroundColorHover() }}
                        >
                          <BsSortAlphaDown />
                          <Text fontWeight={"medium"} fontSize={"14px"}>
                            Sort A-Z
                          </Text>
                        </Button>
                        <Button
                          onClick={() => handleSort("za")}
                          gap={2}
                          backgroundColor={"transparent"}
                          color={primaryTextColor()}
                          _hover={{ backgroundColor: backgroundColorHover() }}
                        >
                          <BsSortAlphaDownAlt />
                          <Text fontWeight={"medium"} fontSize={"14px"}>
                            Sort Z-A
                          </Text>
                        </Button>
                        <Button
                          onClick={handlerSortDeadline}
                          gap={2}
                          backgroundColor={"transparent"}
                          color={primaryTextColor()}
                          _hover={{ backgroundColor: backgroundColorHover() }}
                        >
                          <BsCalendarCheck />
                          <Text fontWeight={"medium"} fontSize={"14px"}>
                            Deadline
                          </Text>
                        </Button>
                      </Stack>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </GridItem>
            </Grid>
            <Button
              onClick={clearFilters}
              color={"gray.400"}
              backgroundColor={backgroundContainer2()}
              _hover={{ backgroundColor: backgroundColorHover() }}
            >
              <FaTrash />
            </Button>
          </HStack>
        </Stack>
      </HStack>
    </Stack>
  );
};

export default FieldsFilter;
