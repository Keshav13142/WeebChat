import {
  Box,
  Flex,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCheck } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { Context } from "../../Context/ContextProvider";
import { findSender } from "../../utils/chatUtils";
import { BACKEND_URL } from "../../utils/helpers";
import GroupDetails from "./GroupDetails";
import SingleUser from "./SingleUser";

const Profile = () => {
  const [profile, setProfile] = useState({});

  const toast = useToast();

  const {
    profileDetails,
    user,
    isProfileOpen,
    setProfileOpen,
    setProfileDetails,
    chats,
    setChats,
    setSelectedChat,
    setShowAddUsers,
  } = useContext(Context);

  useEffect(() => {
    if (profileDetails?._id === user?._id) {
      setProfile(user);
      return;
    }

    if (!profileDetails?.isGroupChat) {
      setProfile(findSender(profileDetails, user));
      return;
    }

    setGroupName(profileDetails.chatName);
    //eslint-disable-next-line
  }, [profileDetails]);

  const [isEditing, setIsEditing] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const [groupName, setGroupName] = useState(profileDetails?.chatName);

  const changeGroupName = async () => {
    if (groupName.trim().length === 0) {
      toast({
        title: "You stupid 😭??",
        description: "Please enter a valid name",
        duration: 2500,
        status: "info",
        position: "top",
      });
      return;
    }

    if (groupName.trim() === profileDetails.chatName) {
      toast({
        title: "It's the same name bro..",
        description: "You need some Glasses 🤓!!",
        duration: 2500,
        status: "info",
        position: "top",
      });
      return;
    }

    setLoading(true);

    const response = await fetch(`${BACKEND_URL}/api/group/rename`, {
      method: "put",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      }),
      body: JSON.stringify({ chatId: profileDetails._id, chatName: groupName }),
    });

    if (response.ok) {
      const data = await response.json();
      setChats([...chats.filter((item) => item._id !== data._id), data]);
      setSelectedChat(data);
      setProfileDetails(data);
      setIsEditing(false);
    } else {
      toast({
        title: "Could not connect!!",
        description: "Something went wrong 😥",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }

    setLoading(false);
  };

  return (
    <>
      <Modal
        size={["xs", "sm"]}
        scrollBehavior="inside"
        isOpen={isProfileOpen}
        onClose={() => {
          setProfileOpen(false);
          setIsEditing(false);
          setShowAddUsers(false);
        }}
      >
        <ModalOverlay />
        <ModalContent height="fit-content">
          <ModalHeader>
            {profileDetails?.isGroupChat ? (
              <Flex alignItems="center" justifyContent="center" gap="5px">
                <Heading fontSize="28px" color="orange.200">
                  {profileDetails?.chatName}
                </Heading>
                <IconButton
                  bg="none"
                  icon={<FiEdit />}
                  onClick={() => {
                    setIsEditing(!isEditing);
                  }}
                />
              </Flex>
            ) : (
              <Text
                rounded="full"
                color="cyan.200"
                fontSize="25"
                textAlign="center"
              >
                Profile
              </Text>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY="scroll" className="custom-scrollbar-search">
            <Box display="flex" alignItems="center" gap="3">
              <Box
                display="flex"
                justifyContent="start"
                gap="3"
                width="100%"
                flexDirection="column"
              >
                {isEditing && (
                  <Flex justify="center" align="center" gap="3px">
                    <Input
                      size="sm"
                      onChange={(e) => {
                        setGroupName(e.target.value);
                      }}
                      value={groupName}
                    />
                    <IconButton
                      isLoading={isLoading}
                      color="green.300"
                      bg="none"
                      icon={<FaCheck />}
                      onClick={changeGroupName}
                    />
                    <IconButton
                      isLoading={isLoading}
                      color="red.300"
                      bg="none"
                      icon={<CgClose />}
                      onClick={() => {
                        setIsEditing(!isEditing);
                      }}
                    />
                  </Flex>
                )}
                {!profileDetails?.isGroupChat ? (
                  <SingleUser profile={profile} />
                ) : (
                  <GroupDetails />
                )}
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Profile;
