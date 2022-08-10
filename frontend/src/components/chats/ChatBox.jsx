import { Avatar, Box, Divider, Heading, IconButton } from "@chakra-ui/react";
import React, { useContext } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { ChatContex } from "../../Context/ContextProvider";

const ChatBox = () => {
  const {
    // chats,
    // setChats,
    // user,
    // setUser,
    // isSearchOpen,
    // setSearchOpen,
    // isProfileOpen,
    setProfileOpen,
    selectedChat,
    setDisplayUser,
    setSelectedChat,
  } = useContext(ChatContex);
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
          display={"flex"}
          justifyContent="space-between"
          alignItems="center"
          gap="10px"
          cursor="pointer"
          onClick={() => {
            setDisplayUser(selectedChat.users[1]);
            setProfileOpen(true);
          }}
        >
          <Avatar
            boxSize="10"
            name={selectedChat?.users[1].name}
            src={selectedChat?.users[1].pic}
          />
          <Heading fontSize="20">{selectedChat?.users[1].name}</Heading>
        </Box>
      </Box>
      <Divider />
      <Box height="100%" width="100%"></Box>
    </Box>
  );
};

export default ChatBox;
