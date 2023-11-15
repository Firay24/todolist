import {
  backgroundColorHover,
  backgroundContainer,
  backgroundContainer2,
  primaryTextColor,
  secondaryColor,
} from "@/components/styles";
import { selectTasks } from "@/redux/taskSlice";
import { getCategoryInfo } from "@/util/category";
import {
  Heading,
  Progress,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Button,
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
  Grid,
  GridItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Spacer,
  Tooltip,
  Editable,
  EditablePreview,
  EditableInput,
  useEditableControls,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

// import icons from react-icons
import { FiSearch } from "react-icons/fi";
import { BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs";
import { GoSortDesc } from "react-icons/go";
import { FaTrash } from "react-icons/fa";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { createCategory, selectCategories } from "@/redux/categorySlice";

const EasyPage = () => {
  const tasks = useSelector(selectTasks);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [useFilter, setUseFilter] = useState(false);

  // add category state handler
  const [addCategoryStatus, setAddCategoryStatus] = useState<boolean>(false);
  const [createdCategory, setCreatedCategory] = useState([]);

  // state popup sort
  const [isOpen, setIsOpen] = useState({
    sort: false,
    filter: false,
    value: false,
  });
  const [sort, setSort] = useState("sort");

  // handler function sort feature
  const handleSort = (value: string) => {
    setUseFilter(true);
    setSort(value === "az" ? "A-Z" : "Z-A");
    onClose("sort");

    if (value === "az") {
      const result = data.sort((a: any, b: any) =>
        a.category.localeCompare(b.category)
      );
      return setData(result);
    } else if (value === "za") {
      const result = data.sort((a: any, b: any) =>
        b.category.localeCompare(a.category)
      );
      return setData(result);
    } else if (value === "") {
      const result = getCategoryInfo(tasks);
      return setData(result);
    }
  };

  // handler function to search feature
  const handleSearch = (value: string) => {
    setUseFilter(true);
    if (value === "") {
      const result = getCategoryInfo(createdCategory);
      return setData(result);
    }

    const result = data.filter((item: any) =>
      item.category.toLowerCase().includes(value.toLowerCase())
    );
    return setData(result);
  };

  // handler to clear a filter
  const clearFilters = () => {
    const originalData = getCategoryInfo(tasks);
    setData(originalData);
    setSort("sort");
    setUseFilter(false);
  };

  // handler add category
  const handleAddCategory = (value: string) => {
    dispatch(createCategory(value));
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

  function EditableControls() {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
      useEditableControls();

    const handleCloseIconClick = () => {
      setAddCategoryStatus(false);
    };

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          aria-label=""
          icon={<CloseIcon />}
          {...getCancelButtonProps({ onClick: handleCloseIconClick })}
        />
        <IconButton
          aria-label=""
          icon={<CheckIcon />}
          {...getSubmitButtonProps({ onClick: handleCloseIconClick })}
        />
      </ButtonGroup>
    ) : null;
  }

  useEffect(() => {
    const result = getCategoryInfo(tasks);
    if (!useFilter) {
      setData(result);
    }
  }, [tasks, useFilter]);

  useEffect(() => {
    if (categories && data.length > 0) {
      const newData = [...data];

      categories &&
        categories.forEach((category: any) => {
          const existingCategory = newData.find(
            (item) => item.category === category.category
          );

          if (!existingCategory) {
            newData.push({
              category: category.category,
              countCategory: 0,
              progress: 0,
              priority: {
                tinggi: 0,
                sedang: 0,
                rendah: 0,
              },
            });
          }
        });

      setCreatedCategory(newData);
    }
  }, [categories, data]);

  useEffect(() => {
    if (createdCategory.length > data.length) {
      if (!useFilter) {
        setData(createdCategory);
      }
    }
  }, [createdCategory]);

  return (
    <Stack padding={3} width="100%">
      <Heading fontSize={"2xl"} color={primaryTextColor()}>
        Tasks by Category
      </Heading>
      <HStack width={"full"} marginTop={4}>
        <Stack width={"25%"}>
          <InputGroup size="sm">
            <InputLeftElement color={"gray.400"}>
              <FiSearch />
            </InputLeftElement>
            <Input
              backgroundColor={backgroundContainer()}
              rounded={"full"}
              placeholder="search"
              borderColor={backgroundContainer2()}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </InputGroup>
        </Stack>
        <Spacer />
        <HStack>
          <Grid>
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
                    </Stack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </GridItem>
          </Grid>
          <Button
            size={"sm"}
            onClick={clearFilters}
            color={"gray.400"}
            backgroundColor={backgroundContainer2()}
            _hover={{ backgroundColor: backgroundColorHover() }}
          >
            <FaTrash />
          </Button>
        </HStack>
      </HStack>
      <Stack
        marginTop={3}
        direction="row"
        wrap="wrap"
        spacing={3}
        backgroundColor={backgroundContainer()}
        padding={4}
        rounded={"base"}
        boxShadow={"sm"}
      >
        <TableContainer
          rounded={"md"}
          width={"full"}
          backgroundColor={backgroundContainer()}
          color={primaryTextColor()}
        >
          <Table variant="simple" size={"sm"}>
            <Thead>
              <Tr>
                <Th color={primaryTextColor()}>Category</Th>
                <Th color={primaryTextColor()}>Dates</Th>
                <Th color={primaryTextColor()}>Count</Th>
                <Th color={primaryTextColor()} />
                <Th color={primaryTextColor()}>Progress</Th>
                <Th color={primaryTextColor()}>Priority</Th>
              </Tr>
            </Thead>
            <Tbody style={{ marginTop: "100px" }}>
              {data.map((item: any, index) => (
                <Tr key={index}>
                  <Td>
                    <Link
                      to={`/category/${item.category.replace(/\s+/g, "-")}`}
                    >
                      {item.category}
                    </Link>
                  </Td>
                  <Td color={secondaryColor()} fontSize={"sm"}>
                    March, 14 2023
                  </Td>
                  <Td>{item.countCategory}</Td>
                  <Td width={1}>
                    <Text fontSize={"xs"}>{`${item.progress}%`}</Text>
                  </Td>
                  <Td width={"full"}>
                    <Progress
                      backgroundColor={"gray.200"}
                      rounded="full"
                      size="sm"
                      value={item.progress}
                      colorScheme="green"
                    />
                  </Td>
                  <Td>
                    <Tooltip
                      label="urgent"
                      aria-label="A tooltip"
                      size={"xs"}
                      backgroundColor={"blue.600"}
                    >
                      <Button
                        variant={"unstyled"}
                        backgroundColor={"red.100"}
                        fontWeight={"medium"}
                        size={"sm"}
                        marginRight={1}
                        color={"black"}
                      >
                        {item.priority.tinggi}
                      </Button>
                    </Tooltip>
                    <Tooltip
                      label="medium"
                      aria-label="A tooltip"
                      size={"xs"}
                      backgroundColor={"blue.600"}
                    >
                      <Button
                        variant={"unstyled"}
                        backgroundColor={"orange.100"}
                        fontWeight={"medium"}
                        size={"sm"}
                        marginRight={1}
                        color={"black"}
                      >
                        {item.priority.sedang}
                      </Button>
                    </Tooltip>
                    <Tooltip
                      label="easy"
                      aria-label="A tooltip"
                      size={"xs"}
                      backgroundColor={"blue.600"}
                    >
                      <Button
                        variant={"unstyled"}
                        backgroundColor={"green.100"}
                        fontWeight={"medium"}
                        size={"sm"}
                        color={"black"}
                      >
                        {item.priority.rendah}
                      </Button>
                    </Tooltip>
                  </Td>
                </Tr>
              ))}
              {addCategoryStatus ? (
                <Tr>
                  <Td colSpan={6} paddingX={0}>
                    <Editable
                      onSubmit={handleAddCategory}
                      defaultValue="Take some chakra"
                      padding={2}
                    >
                      <EditablePreview />
                      <HStack>
                        <Stack>
                          <EditableControls />
                        </Stack>
                        <Stack width={"full"}>
                          <Input as={EditableInput} />
                        </Stack>
                      </HStack>
                    </Editable>
                  </Td>
                </Tr>
              ) : null}
              <Tr>
                <Td colSpan={6} width={"100%"} paddingX={0}>
                  <Button
                    onClick={() => setAddCategoryStatus(true)}
                    variant={"unstyled"}
                    width={"100%"}
                    fontSize={"sm"}
                    display={"flex"}
                    gap={2}
                    _hover={{ backgroundColor: backgroundColorHover() }}
                    backgroundColor={backgroundContainer2()}
                  >
                    <AiOutlinePlus />
                    <Text>Add Category</Text>
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
    </Stack>
  );
};

export default EasyPage;
