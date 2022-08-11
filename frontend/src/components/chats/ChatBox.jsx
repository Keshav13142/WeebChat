import { Avatar, Box, Divider, Heading, IconButton } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { VscInfo } from "react-icons/vsc";
import { Context } from "../../Context/ContextProvider";
import { findSender } from "../../utils/chatUtils";

const ChatBox = () => {
  const {
    // chats,
    // setChats,
    user,
    // setUser,
    // isSearchOpen,
    // setSearchOpen,
    // isProfileOpen,
    setProfileOpen,
    selectedChat,
    setProfileDetails,
    setSelectedChat,
  } = useContext(Context);

  const [sender, setSender] = useState({});

  useEffect(() => {
    setSender(findSender(selectedChat, user));
    //eslint-disable-next-line
  }, [selectedChat.users]);
  return (
    <Box
      backgroundColor="#12161f"
      display={"flex"}
      flexDirection="column"
      justifyContent="center"
      alignItems="start"
      width={{ base: "100%", md: "70%" }}
      gap="10px"
      padding="10px"
      borderRadius="10px"
    >
      <Box
        height="fit-content"
        width="100%"
        display={"flex"}
        justifyContent="flex-start"
        alignItems="center"
        gap="10px"
      >
        <IconButton
          bgColor="#0f131a"
          display="flex"
          icon={<MdOutlineArrowBackIosNew />}
          onClick={() => {
            setSelectedChat(null);
          }}
        />
        <Box
          height="fit-content"
          width="100%"
          display={"flex"}
          justifyContent="space-between"
          alignItems="center"
          gap="10px"
        >
          <Box
            display={"flex"}
            justifyContent="space-between"
            alignItems="center"
            gap="10px"
            cursor="pointer"
            onClick={() => {
              setProfileDetails(selectedChat);
              setProfileOpen(true);
            }}
          >
            <Avatar
              boxSize="10"
              name={
                selectedChat?.isGroupChat
                  ? selectedChat?.chatName
                  : sender?.name
              }
              src={
                selectedChat?.isGroupChat
                  ? selectedChat?.chatAvatar
                  : sender?.pic
              }
            />
            <Heading fontSize="19">
              {selectedChat?.isGroupChat
                ? selectedChat?.chatName
                : sender?.name}
            </Heading>
          </Box>
          <IconButton
            onClick={() => {
              setProfileDetails(selectedChat);
              setProfileOpen(true);
            }}
            background="none"
            icon={<VscInfo />}
          />
        </Box>
      </Box>
      <Divider />
      <Box height="100%" width="100%"></Box>
    </Box>
  );
};

export default ChatBox;
