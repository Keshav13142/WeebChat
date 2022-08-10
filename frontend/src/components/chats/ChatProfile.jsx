import { Avatar, Box, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/ContextProvider";

const ChatProfile = ({ chat }) => {
  const {
    // chats,
    // setChats,
    user,
    // setUser,
    // isSearchOpen,
    // setSearchOpen,
    // isProfileOpen,
    // setProfileOpen,
    selectedChat,
    setSelectedChat,
  } = useContext(Context);

  const [sender, setSender] = useState({});

  useEffect(() => {
    if (chat?.users?.[1]?.name === user?.name) {
      setSender(chat?.users?.[0]);
      return;
    } else setSender(chat?.users?.[1]);
    //eslint-disable-next-line
  }, [chat]);

  return (
    <Box
      width="100%"
      variant="ghost"
      name={chat?._id}
      cursor={"pointer"}
      display={"flex"}
      justifyContent="start"
      alignItems="center"
      borderRadius="10px"
      _hover={{ backgroundColor: "#2c313d" }}
      gap="10px"
      padding="3px"
      onClick={() => {
        setSelectedChat(chat);
      }}
      borderBottom="1px solid #292d35"
    >
      <Avatar
        marginLeft="5px"
        boxSize="10"
        src={chat?.isGroupChat ? chat.chatAvatar : sender.pic}
        name={chat?.isGroupChat ? chat.chatName : sender.name}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          color: "white",
          gap: "3px",
        }}
      >
        <Text fontSize={18}>
          {chat?.isGroupChat ? chat?.chatName : sender.name}
        </Text>
        <Text fontSize="15px" fontWeight="200">
          {selectedChat?.latestMessage || "Start a chat"}
        </Text>
      </div>
    </Box>
  );
};

export default ChatProfile;
