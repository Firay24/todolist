import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Button,
  Text,
} from "@chakra-ui/react";

function MyComponent() {
  const [activePopover, setActivePopover] = useState(null);

  const handleOptionHover = (option: any) => {
    setActivePopover(option);
  };

  return (
    <Popover isOpen={activePopover !== null}>
      <PopoverTrigger>
        <Button>Show Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Choose an option</PopoverHeader>
        <PopoverBody>
          <Text
            _hover={{ textDecoration: "underline", cursor: "pointer" }}
            onMouseEnter={() => handleOptionHover("Option 1")}
          >
            Option 1
          </Text>
          <Text
            _hover={{ textDecoration: "underline", cursor: "pointer" }}
            onMouseEnter={() => handleOptionHover("Option 2")}
          >
            Option 2
          </Text>
        </PopoverBody>
        {activePopover && (
          <Popover>
            <PopoverTrigger>
              <Text _hover={{ textDecoration: "underline", cursor: "pointer" }}>
                {activePopover}
              </Text>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>{activePopover} Details</PopoverHeader>
              <PopoverBody>{/* Content for the subpopover */}</PopoverBody>
            </PopoverContent>
          </Popover>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default MyComponent;
