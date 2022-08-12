import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/ContextProvider";
import { findSender } from "../../utils/chatUtils";
import GroupDetails from "./GroupDetails";
import SingleUser from "./SingleUser";

const Profile = () => {
  const [profile, setProfile] = useState({});

  const { profileDetails, user, isProfileOpen, setProfileOpen } =
    useContext(Context);

  useEffect(() => {
    if (profileDetails?._id === user?._id) {
      setProfile(user);
      return;
    }

    if (!profileDetails?.isGroupChat) {
      setProfile(findSender(profileDetails, user));
      return;
    }
    //eslint-disable-next-line
  }, [profileDetails]);

  return (
    <>
      <Modal
        size={["xs", "sm"]}
        scrollBehavior="inside"
        isOpen={isProfileOpen}
        onClose={() => {
          setProfileOpen(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text
              rounded="full"
              color="cyan.200"
              fontSize="25"
              textAlign="center"
            >
              {profileDetails?.isGroupChat
                ? profileDetails?.chatName
                : "Profile"}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" alignItems="center" gap="3">
              <Box
                display="flex"
                justifyContent="start"
                gap="3"
                width="100%"
                flexDirection="column"
              >
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
