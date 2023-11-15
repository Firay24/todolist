// import library used
import {
  Button,
  ButtonGroup,
  Editable,
  EditablePreview,
  HStack,
  IconButton,
  Input,
  Spacer,
  Stack,
  Text,
  useEditableControls,
  EditableInput,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

// import global state
import {
  backgroundColor,
  backgroundColorHover,
  backgroundContainer2,
  primaryTextColor,
  secondaryColor,
} from "@/components/styles";

// import redux state flow
import { createCategory, selectCategories } from "@/redux/categorySlice";
import { useDispatch, useSelector } from "react-redux";

// import react-icons
import { BsListTask } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import {
  AiOutlineSmile,
  AiOutlineAlert,
  AiOutlineAliwangwang,
  AiOutlineApartment,
  AiOutlineAudit,
  AiOutlineAudio,
  AiOutlineBook,
} from "react-icons/ai";

// import util data
import { icons } from "@/util/data";

const Categories = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  // import categories state
  const categories = useSelector(selectCategories);

  // add category state handler
  const [addCategoryStatus, setAddCategoryStatus] = useState<boolean>(false);
  const [categoryData, setCategoryData] = useState({
    category: "",
    icon: "BsListTask",
  });
  const [popoverIcon, setPopoverIcon] = useState(false);

  // create react component from icon string name from react-icons
  function getIconComponent(iconName: string) {
    const iconMap = {
      BsListTask,
      AiOutlineAlert,
      AiOutlineAliwangwang,
      AiOutlineApartment,
      AiOutlineAudit,
      AiOutlineAudio,
      AiOutlineBook,
    };
    return iconMap[iconName] || null;
  }

  // funtion to custom editable control
  const EditableControls = () => {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
      useEditableControls();

    const handleCloseIconClick = () => {
      setAddCategoryStatus(false);
    };

    const handleSubmit = () => {
      dispatch(
        createCategory({
          category: categoryData.category,
          icon: categoryData.icon,
        })
      );
      setAddCategoryStatus(false);
      setCategoryData({
        category: "",
        icon: "BsListTask",
      });
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
          {...getSubmitButtonProps({ onClick: handleSubmit })}
        />
      </ButtonGroup>
    ) : null;
  };

  return (
    <Stack paddingX={4} paddingY={2} gap={1} color={primaryTextColor()}>
      {/* Header */}
      <HStack>
        <Text color={secondaryColor()} fontSize={"14px"} fontWeight={"thin"}>
          Categories
        </Text>
        <Spacer />
        <Button
          size={"xs"}
          backgroundColor={backgroundContainer2()}
          _hover={{ backgroundColor: backgroundColorHover() }}
          color={primaryTextColor()}
          onClick={() => setAddCategoryStatus(true)}
        >
          <AiOutlinePlus />
        </Button>
      </HStack>

      {/* form create category */}
      {addCategoryStatus ? (
        <Editable defaultValue="New category" padding={2}>
          <HStack>
            <HStack>
              <Stack>
                {/* popver icons options */}
                <Popover isOpen={popoverIcon}>
                  <PopoverTrigger>
                    <Button
                      size={"xs"}
                      backgroundColor={backgroundContainer2()}
                      _hover={{ backgroundColor: backgroundColorHover() }}
                      color={primaryTextColor()}
                      variant={"ghost"}
                      onClick={() => setPopoverIcon(!popoverIcon)}
                    >
                      {categoryData.icon !== "BsListTask" ? (
                        React.createElement(getIconComponent(categoryData.icon))
                      ) : (
                        <AiOutlineSmile />
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverBody gap={3}>
                      <HStack gap={4} wrap={"wrap"}>
                        {icons &&
                          icons.map((icon, index) => (
                            <Button
                              key={index}
                              cursor={"pointer"}
                              onClick={() => {
                                setCategoryData({
                                  ...categoryData,
                                  icon: icon,
                                });
                                setPopoverIcon(false);
                              }}
                              variant={"ghost"}
                            >
                              {React.createElement(getIconComponent(icon), {
                                fontSize: "24px",
                              })}
                            </Button>
                          ))}
                      </HStack>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Stack>
              <EditablePreview />
            </HStack>
            <Stack>
              {/* input category */}
              <Stack width={"full"}>
                <Input
                  as={EditableInput}
                  value={categoryData.category}
                  onChange={(e) => {
                    setCategoryData({
                      ...categoryData,
                      category: e.target.value,
                    });
                  }}
                />
              </Stack>
              <Stack justifyContent={"start"} alignItems={"start"}>
                <EditableControls />
              </Stack>
            </Stack>
          </HStack>
        </Editable>
      ) : null}

      {/* categories list */}
      {categories &&
        categories.map((item: any, index) => (
          <HStack
            key={index}
            backgroundColor={
              pathname ===
              `/category/${item.category && item.category.replace(/\s+/g, "-")}`
                ? backgroundColor()
                : undefined
            }
            padding={2}
            rounded={"lg"}
            onClick={() =>
              navigate(
                `/category/${
                  item.category && item.category.replace(/\s+/g, "-")
                }`
              )
            }
            cursor={"pointer"}
          >
            <Stack fontSize={"18px"}>
              {item.icon &&
                React.createElement(getIconComponent(item.icon), {
                  fontSize: "18px",
                })}
            </Stack>
            <Text fontSize={"sm"}>{item.category}</Text>
          </HStack>
        ))}
    </Stack>
  );
};

export default Categories;
