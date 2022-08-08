import {
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { ChatContex } from "../Context/chatProvider";
import ProfileCards from "./ProfileCards";

const SearchModal = ({ users }) => {
  const { isOpen, setOpen } = useContext(ChatContex);

  const createChat = async () => {};

  return (
    <Modal
      size={["xs"]}
      scrollBehavior="inside"
      isOpen={isOpen}
      onClose={() => {
        setOpen(false);
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Input marginTop={8} placeholder="Search users by name or email" />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack maxW={"fit-content"} spacing={"10px"}>
            {users.map((user, ind) => (
              <ProfileCards key={ind} user={user} createChat={createChat} />
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SearchModal;
