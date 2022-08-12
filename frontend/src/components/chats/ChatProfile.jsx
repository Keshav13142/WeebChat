import { Avatar, Box, Flex, Tag, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/ContextProvider";
import { findSender } from "../../utils/chatUtils";

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
    setSender(findSender(chat, user));
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
        src={chat?.isGroupChat ? chat.chatAvatar : sender?.pic}
        name={chat?.isGroupChat ? chat.chatName : sender?.name}
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
        <Flex fontSize={18}>
          {chat?.isGroupChat ? chat?.chatName : sender?.name}
          {chat?.isGroupChat && (
            <Tag
              size="sm"
              marginLeft="5px"
              variant="outline"
              colorScheme="green"
            >
              Group
            </Tag>
          )}
        </Flex>
        <Text fontSize="15px" fontWeight="200">
          {selectedChat?.latestMessage || "Start a chat"}
        </Text>
      </div>
    </Box>
  );
};

export default ChatProfile;
