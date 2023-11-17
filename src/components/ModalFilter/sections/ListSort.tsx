import { backgroundColorHover, primaryTextColor } from "@/components/styles";
import { Button, HStack, Radio, Spacer, Stack, Text } from "@chakra-ui/react";
import { getIconComponent } from "../util/data";
import React from "react";

const ListSort = (props: { text: string; icon: string }) => {
  return (
    <Button
      backgroundColor={"transparent"}
      color={primaryTextColor()}
      _hover={{ backgroundColor: backgroundColorHover() }}
      justifyContent={"start"}
      gap={2}
    >
      <Stack direction="row">
        <Radio size={"sm"} value={props.text}>
          <HStack>
            <Text fontWeight={"medium"} fontSize={"14px"}>
              {props.text}
            </Text>
          </HStack>
        </Radio>
      </Stack>
      <Spacer />
      {/* icons */}
      {React.createElement(getIconComponent(props.icon))}
    </Button>
  );
};

export default ListSort;
