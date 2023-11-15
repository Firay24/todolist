import { WarningTwoIcon } from "@chakra-ui/icons";
import { Heading, Stack, Text } from "@chakra-ui/react";

const NullContent = () => {
  return (
    <Stack textAlign="center" py={10} px={6}>
      <Stack justifyContent={"center"} alignItems={"center"}>
        <WarningTwoIcon boxSize={"50px"} color={"gray.400"} />
      </Stack>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        No corresponding task
      </Heading>
      <Text color={"gray.500"}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua.
      </Text>
    </Stack>
  );
};

export default NullContent;
