import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { ChatContex } from "../../Context/chatProvider";

const ProfileModal = () => {
  const {
    displayUser: user,
    isProfileOpen,
    setProfileOpen,
  } = useContext(ChatContex);
  return (
    <Modal
      onClose={() => setProfileOpen(false)}
      isOpen={isProfileOpen}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{user?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>asdasd</ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
