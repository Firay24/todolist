// import library used
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

// import global style
import {
  backgroundColorHover,
  backgroundContainer,
  backgroundContainer2,
  primaryTextColor,
} from "../styles";

// import icons
import { TbTrash } from "react-icons/tb";

// interface props
interface ConfirmModalProps {
  handleDelete: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ handleDelete }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();

  // handler if click delete button, show success toast
  const handleClickDeleteButton = () => {
    toast({
      title: "Task deleted",
      description: "We've deleted your task for you.",
      status: "success",
      duration: 1000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <>
      {/* button delete */}
      <Button
        onClick={onOpen}
        backgroundColor={backgroundContainer()}
        variant={"outline"}
        color={primaryTextColor()}
        borderColor={backgroundContainer2()}
        _hover={{ backgroundColor: backgroundColorHover() }}
      >
        <TbTrash />
      </Button>

      {/* modal component: confirmation */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure?</ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                handleDelete();
                handleClickDeleteButton();
                onClose();
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmModal;
