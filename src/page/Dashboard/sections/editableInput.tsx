// ***THIS COMPONENT IS NOT YET USED***

// import library used
import {
  ButtonGroup,
  Editable,
  EditablePreview,
  Flex,
  IconButton,
  Input,
  useEditableControls,
} from "@chakra-ui/react";

// import icons from react-icons
import { BsCheckSquare } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsFillRecordCircleFill } from "react-icons/bs";

function CustomControlsExample() {
  /* custom control */
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          icon={<BsCheckSquare />}
          {...getSubmitButtonProps()}
          aria-label=""
        />
        <IconButton
          icon={<AiOutlineCloseCircle />}
          {...getCancelButtonProps()}
          aria-label=""
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          size="sm"
          icon={<BsFillRecordCircleFill />}
          {...getEditButtonProps()}
          aria-label=""
        />
      </Flex>
    );
  }

  return (
    <Editable
      textAlign="center"
      defaultValue="Rasengan ⚡️"
      fontSize="2xl"
      isPreviewFocusable={false}
    >
      <EditablePreview />
      {/* Here is the custom input */}
      <Input as={EditableInput} />
      <EditableControls />
    </Editable>
  );
}

export default CustomControlsExample;
