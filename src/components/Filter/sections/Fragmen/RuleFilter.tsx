// import library used
import {
  Button,
  Checkbox,
  Grid,
  GridItem,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
} from "@chakra-ui/react";

// import global style
import {
  backgroundColorHover,
  backgroundContainer,
  primaryTextColor,
  secondaryColor,
} from "@/components/styles";

// import icons from react icons
import { BiCategoryAlt, BiChevronDown } from "react-icons/bi";
import { BsAppIndicator } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { TbProgressCheck } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCategories } from "@/redux/categorySlice";
import { selectTasks } from "@/redux/taskSlice";
import { TbLogicAnd, TbLogicOr } from "react-icons/tb";

import { usePopover } from "../AdvanceFilter";

const RuleFilter = (props: {
  onDelete: any;
  index: string;
  isFirst: boolean;
  onSave: any;
  onOpen: any;
  isOpen: boolean;
}) => {
  // state task
  const [data, setData] = useState([]);
  const tasks = useSelector(selectTasks);

  // state to handling the value of the advance filter result
  const [criteria, setCriteria] = useState<string>("");
  const categories = useSelector(selectCategories);
  const [operator, setOperator] = useState<string>("||");

  // state trigger
  const [isOpenFilterBy, setIsOpenFilterBy] = useState<boolean>(false);
  const [isOpenOperator, setIsOpenOperator] = useState<boolean>(false);
  const [valueByCriteria, setValueByCriteria] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // usecontext popover initial
  const { childIsOpen, handlerIsOpenPopover } = usePopover();

  // handle delete
  const handleDelete = () => {
    props.onDelete(props.index);
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

  // handler popover onOpen
  const onOpenPopover = () => {
    handlerIsOpenPopover(props.index);
  };

  // if selected option (value), criteria and operator changed
  useEffect(() => {
    const ruleValue = {
      criteria: criteria,
      value: selectedOptions,
      operator: operator,
      index: props.index,
    };
    props.onSave(ruleValue);
  }, [selectedOptions, criteria, operator]);

  // send default original data b'cause empty filter return dashboard page empty array
  useEffect(() => {
    setData(tasks);
  }, []);

  // get unique category for filter criteria
  useEffect(() => {
    const uniqueValues = [...new Set(data.map((item) => item[criteria]))];
    setValueByCriteria(uniqueValues);
  }, [criteria]);

  // handler popover close
  useEffect(() => {
    if (isOpenFilterBy) {
      setIsOpenOperator(false);
      if (childIsOpen !== props.index) {
        onOpenPopover();
      }
      props.onOpen(true);
    }
  }, [isOpenFilterBy]);

  // handler popover close if popover choose operator
  useEffect(() => {
    if (isOpenOperator) {
      setIsOpenFilterBy(false);
      if (childIsOpen !== props.index) {
        onOpenPopover();
      }
      props.onOpen(true);
    }
  }, [isOpenOperator]);

  // handler popover close if popover child from single rule filter
  useEffect(() => {
    if (!(childIsOpen === props.index)) {
      setIsOpenFilterBy(false);
      setIsOpenOperator(false);
    }
  }, [childIsOpen]);

  // handler if parent popover changed
  useEffect(() => {
    if (props.isOpen) {
      setIsOpenFilterBy(false);
      setIsOpenOperator(false);
    }
  }, [props.isOpen]);

  return (
    <Grid templateColumns="repeat(7, 1fr)" gap={3}>
      {/* single rule */}
      <GridItem colSpan={1}>
        <Stack alignItems={"center"} justifyContent={"center"} height="100%">
          {props.isFirst ? (
            <Text textAlign="center" alignItems="center" width={"80px"}>
              Where
            </Text>
          ) : (
            <Popover isOpen={isOpenOperator}>
              <PopoverTrigger>
                <Button
                  variant={"outline"}
                  size={"sm"}
                  fontWeight={"normal"}
                  gap={2}
                  onClick={() => setIsOpenOperator(!isOpenOperator)}
                  width={"80px"}
                >
                  {operator === "||" ? "OR" : "AND"}
                  <BiChevronDown />
                </Button>
              </PopoverTrigger>
              <PopoverContent width={"100%"}>
                <PopoverBody>
                  <Stack>
                    <Button
                      justifyContent={"start"}
                      gap={2}
                      backgroundColor={"transparent"}
                      color={primaryTextColor()}
                      _hover={{
                        backgroundColor: backgroundColorHover(),
                      }}
                      onClick={() => {
                        setOperator("&&");
                        setIsOpenOperator(false);
                      }}
                    >
                      <TbLogicAnd />
                      <Text fontWeight={"medium"} fontSize={"14px"}>
                        AND
                      </Text>
                    </Button>
                    <Button
                      justifyContent={"start"}
                      gap={2}
                      backgroundColor={"transparent"}
                      color={primaryTextColor()}
                      _hover={{
                        backgroundColor: backgroundColorHover(),
                      }}
                      onClick={() => {
                        setOperator("||");
                        setIsOpenOperator(false);
                      }}
                    >
                      <TbLogicOr />
                      <Text fontWeight={"medium"} fontSize={"14px"}>
                        OR
                      </Text>
                    </Button>
                  </Stack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          )}
        </Stack>
      </GridItem>

      {/* filter by component */}
      <GridItem colSpan={2}>
        <Stack alignItems={"center"} justifyContent={"center"} height="100%">
          <Popover isOpen={isOpenFilterBy}>
            <PopoverTrigger>
              <Button
                variant={"outline"}
                size={"sm"}
                width={"full"}
                fontWeight={"medium"}
                gap={2}
                onClick={() => {
                  setIsOpenFilterBy(!isOpenFilterBy);
                }}
              >
                {criteria === "category" ? (
                  <BiCategoryAlt />
                ) : criteria === "priority" ? (
                  <BsAppIndicator />
                ) : criteria === "completed" ? (
                  <TbProgressCheck />
                ) : null}
                <Text>
                  {criteria === ""
                    ? "Filter by"
                    : criteria === "completed"
                    ? "Progress"
                    : criteria}
                </Text>
                {criteria === "" ? <BiChevronDown /> : null}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              width={"100%"}
              backgroundColor={backgroundContainer()}
            >
              <PopoverBody>
                <Stack>
                  <Button
                    justifyContent={"start"}
                    gap={2}
                    backgroundColor={"transparent"}
                    color={primaryTextColor()}
                    _hover={{
                      backgroundColor: backgroundColorHover(),
                    }}
                    onClick={() => {
                      setIsOpenFilterBy(false);
                      setCriteria("category");
                    }}
                  >
                    <BiCategoryAlt />
                    <Text fontWeight={"medium"} fontSize={"14px"}>
                      Category
                    </Text>
                  </Button>
                  <Button
                    justifyContent={"start"}
                    gap={2}
                    backgroundColor={"transparent"}
                    color={primaryTextColor()}
                    _hover={{ backgroundColor: backgroundColorHover() }}
                    onClick={() => {
                      setIsOpenFilterBy(false);
                      setCriteria("priority");
                    }}
                  >
                    <BsAppIndicator />
                    <Text fontWeight={"medium"} fontSize={"14px"}>
                      Priority
                    </Text>
                  </Button>
                  <Button
                    justifyContent={"start"}
                    gap={2}
                    backgroundColor={"transparent"}
                    color={primaryTextColor()}
                    _hover={{ backgroundColor: backgroundColorHover() }}
                    onClick={() => {
                      setIsOpenFilterBy(false);
                      setCriteria("completed");
                    }}
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
        </Stack>
      </GridItem>

      {/* filter by value from each categories components */}
      <GridItem colSpan={3}>
        <Stack alignItems={"center"} justifyContent={"center"} height="100%">
          <Popover>
            <PopoverTrigger>
              <Button
                variant={"outline"}
                size={"sm"}
                width={"full"}
                fontWeight={"medium"}
                gap={2}
                isDisabled={criteria === ""}
                onClick={() => setIsOpenFilterBy(false)}
              >
                Value
                <BiChevronDown />
              </Button>
            </PopoverTrigger>
            <PopoverContent width={"100%"}>
              <PopoverBody>
                <Stack>
                  {criteria === "category"
                    ? categories.map((item: any, index: number) => (
                        <Checkbox
                          key={index}
                          isChecked={selectedOptions.includes(item.category)}
                          onChange={() => handleCheckboxChange(item.category)}
                        >
                          {criteria === "completed"
                            ? item.category
                              ? "Done"
                              : "Doing"
                            : item.category}
                        </Checkbox>
                      ))
                    : valueByCriteria.map((item: any, index: number) => (
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
        </Stack>
      </GridItem>

      {/* deleted single rule */}
      <GridItem>
        <Button
          onClick={handleDelete}
          variant={"ghost"}
          color={secondaryColor()}
        >
          <MdDelete />
        </Button>
      </GridItem>
    </Grid>
  );
};

export default RuleFilter;
