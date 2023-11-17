import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  RadioGroup,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { backgroundContainer, primaryTextColor } from "../styles";
import ListSort from "./sections/ListSort";
import { listSort } from "./util/data";
import { MdFilterAlt } from "react-icons/md";
import ListFilter from "./sections/ListFilter";
import { listFilter } from "./util/data";
import FiltersField from "../Filter";

const ModalFilter = (props: {
  handlerReceiveData: any;
  handlerResetFilter: any;
  handlerUseFilter: any;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Stack>
      <Button
        size={"sm"}
        color={primaryTextColor()}
        backgroundColor={backgroundContainer()}
        onClick={onOpen}
      >
        <MdFilterAlt />{" "}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filter fields</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom={4}>
            <FiltersField
              sendData={props.handlerReceiveData}
              resetFilter={props.handlerResetFilter}
              useFilter={props.handlerUseFilter}
              useCategory={true}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
    // <Stack>
    //   <Button
    //     size={"sm"}
    //     color={primaryTextColor()}
    //     backgroundColor={backgroundContainer()}
    //     onClick={onOpen}
    //   >
    // //     <MdFilterAlt />
    // //   </Button>
    //   <Modal isOpen={isOpen} onClose={onClose}>
    //     <ModalOverlay />
    //     <ModalContent>
    //       <ModalHeader>Filter fields</ModalHeader>
    //       <ModalCloseButton />
    //       <ModalBody marginBottom={4}>
    //         {/* Sory by */}
    //         <Accordion defaultIndex={[0]} allowMultiple>
    //           <AccordionItem>
    //             <h2>
    //               <AccordionButton>
    //                 <Box as="span" flex="1" textAlign="left">
    //                   Sort by
    //                 </Box>
    //                 <AccordionIcon />
    //               </AccordionButton>
    //             </h2>
    //             <AccordionPanel pb={4}>
    //               <RadioGroup>
    //                 <Stack>
    //                   {listSort.map((item, index) => (
    //                     <ListSort
    //                       key={index}
    //                       text={item.name}
    //                       icon={item.icon}
    //                     />
    //                   ))}
    //                 </Stack>
    //               </RadioGroup>
    //             </AccordionPanel>
    //           </AccordionItem>
    //         </Accordion>

    //         {/* Filter by */}
    //         <Stack marginTop={4}>
    //           <Stack padding={4}>
    //             <Text>Filter by</Text>
    //           </Stack>
    //           <Stack>
    //             <Accordion defaultIndex={[0]} allowMultiple>
    //               {listFilter.map((item, index) => (
    //                 <ListFilter key={index} name={item.name} />
    //                 // <Text key={index}>{item.name}</Text>
    //               ))}
    //               {/* <AccordionItem>
    //                 <h2>
    //                   <AccordionButton>
    //                     <Box as="span" flex="1" textAlign="left">
    //                       Sort by
    //                     </Box>
    //                     <AccordionIcon />
    //                   </AccordionButton>
    //                 </h2>
    //                 <AccordionPanel pb={4}>
    //                   <RadioGroup></RadioGroup>
    //                 </AccordionPanel>
    //               </AccordionItem> */}
    //             </Accordion>
    //           </Stack>
    //         </Stack>
    //       </ModalBody>
    //       <ModalFooter>
    //         <Button>Clear filter</Button>
    //       </ModalFooter>
    //     </ModalContent>
    //   </Modal>
    // </Stack>
  );
};

export default ModalFilter;
