// import library used
import {
  Button,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";

// import global style
import {
  backgroundColorHover,
  primaryTextColor,
  secondaryColor,
} from "@/components/styles";

// import global state from redux flow
import { useSelector } from "react-redux";
import { selectTasks } from "@/redux/taskSlice";

// import icons from react-icons
import { BiChevronDown } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { GoCopy } from "react-icons/go";

// import components used
import RuleFilter from "./Fragmen/RuleFilter";

// import advance filter logic
import { advanceFilter } from "@/util/filter";

const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// create context theme
export const PopoverContext: any = createContext(null);

export const usePopover = () => {
  return useContext(PopoverContext);
};

const AdvanceFilter = (props: { onOpen: boolean; sendData: any }) => {
  const tasks = useSelector(selectTasks);
  // state custome rules
  const [gridIds, setGridIds] = useState([generateUniqueId()]);

  // state to handler isOpen popover
  const [isOpenParentPopover, setIsOpenParentPopover] = useState(props.onOpen);
  const [isOpen, setIsOpen] = useState(false);
  const [childIsOpen, setChildIsOpen] = useState(false);

  // state to handler all rules filter
  const [rule, setRule] = useState([]);

  // state onSubmit to filter after input all rules filter
  const [onSubmit, setOnSubmit] = useState(false);

  // function to add single rule filter
  const addGrid = () => {
    const newId = generateUniqueId();
    const newGridIds = [...gridIds, newId];
    setGridIds(newGridIds);
    setIsOpen(false);
  };

  // handler funtion to delete grid rule
  const deleteGrid = (gridIdToDelete: string) => {
    const newGridIds = gridIds.filter((id) => id !== gridIdToDelete);
    setGridIds(newGridIds);
  };

  // send rule if submit button
  const handlerValueRule = (value: any) => {
    const indexExists = rule.some(
      (existingRule) => existingRule.index === value.index
    );

    if (indexExists) {
      const updatedRule = rule.map((existingRule) => {
        if (existingRule.index === value.index) {
          return value;
        }
        return existingRule;
      });

      setRule(updatedRule);
    } else {
      setRule([...rule, value]);
    }
  };

  // handler receive isOpen child popover
  const handlerChildPopoverIsOpen = (value: any) => {
    if (value) {
      setIsOpen(false);
    }
  };

  // handler change status popover status open
  const handlerIsOpenPopover = (gridID: any) => {
    setChildIsOpen((prev) => (prev === gridID ? null : gridID));
  };

  // format rules query
  const formatRules = (data: any) => {
    if (!data || data.length === 0) {
      return "";
    }

    const expressions = data.map((item, index) => {
      const { criteria, value, operator } = item;

      if (index === 0) {
        return `row.${criteria} === ${JSON.stringify(value[0])}`;
      } else {
        return `${operator} row.${criteria} === ${JSON.stringify(value[0])}`;
      }
    });

    return expressions.join(" ");
  };

  // send result if submitted
  useEffect(() => {
    if (onSubmit) {
      const query = formatRules(rule);
      const result = advanceFilter({ data: tasks, filterQuery: query });
      props.sendData(result);
      setOnSubmit(false);
    }
  }, [onSubmit]);

  return (
    <PopoverContext.Provider value={{ childIsOpen, handlerIsOpenPopover }}>
      <Popover isOpen={isOpenParentPopover} placement="auto-start">
        <PopoverContent width={"90%"}>
          {/* rules components */}
          <PopoverBody>
            {gridIds.map((gridId, index) => (
              <Stack key={gridId}>
                <RuleFilter
                  onDelete={() => deleteGrid(gridId)}
                  index={gridId}
                  isFirst={index === 0}
                  onSave={handlerValueRule}
                  onOpen={handlerChildPopoverIsOpen}
                  isOpen={isOpen}
                />
              </Stack>
            ))}
          </PopoverBody>
          {/* add filter rules */}
          <PopoverFooter>
            <HStack>
              <Stack>
                <Popover placement="bottom-start" isOpen={isOpen}>
                  <PopoverTrigger>
                    <Button
                      variant={"ghost"}
                      size={"sm"}
                      width={"full"}
                      fontWeight={"medium"}
                      gap={2}
                      justifyContent={"left"}
                      color={secondaryColor()}
                      onClick={() => setIsOpen(true)}
                    >
                      <AiOutlinePlus />
                      Add filter rule
                      <BiChevronDown />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent width={"100%"}>
                    <PopoverArrow />
                    <PopoverBody>
                      <Stack>
                        <Button
                          justifyContent={"start"}
                          gap={2}
                          backgroundColor={"transparent"}
                          color={primaryTextColor()}
                          _hover={{ backgroundColor: backgroundColorHover() }}
                          size={"xs"}
                          onClick={addGrid}
                        >
                          <AiOutlinePlus />
                          <Text fontWeight={"normal"} fontSize={"12px"}>
                            Add filter rule
                          </Text>
                        </Button>
                        <Button
                          justifyContent={"start"}
                          gap={2}
                          backgroundColor={"transparent"}
                          color={primaryTextColor()}
                          _hover={{ backgroundColor: backgroundColorHover() }}
                          size={"xs"}
                        >
                          <GoCopy />
                          <Text fontWeight={"normal"} fontSize={"12px"}>
                            Add filter group
                          </Text>
                        </Button>
                      </Stack>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Stack>
              <Spacer />
              <Stack>
                <Button
                  size={"sm"}
                  fontWeight={"medium"}
                  fontSize={"sm"}
                  onClick={() => {
                    setOnSubmit(true);
                    setIsOpenParentPopover(false);
                  }}
                >
                  Submit
                </Button>
              </Stack>
            </HStack>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </PopoverContext.Provider>
  );
};

export default AdvanceFilter;
