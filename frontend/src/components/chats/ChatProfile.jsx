import { Avatar, Badge, Box, Flex, Tag, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/ContextProvider";
import { findSender } from "../../utils/chatUtils";

const ChatProfile = ({ chat }) => {
  const { user, setSelectedChat, notifications, setNotifications } =
    useContext(Context);

  const [sender, setSender] = useState({});

  useEffect(() => {
    setSender(findSender(chat, user));
    //eslint-disable-next-line
  }, [chat]);

  useEffect(() => {
    console.log(notifications);
  }, [notifications]);

  return (
    <Box
      width="100%"
      cursor={"pointer"}
      display={"flex"}
      _hover={{ backgroundColor: "#2c313d" }}
      onClick={() => {
        setSelectedChat(chat);
        setNotifications((prev) =>
          prev.filter((msg) => msg?.chat?._id !== chat._id)
        );
      }}
      name={chat?._id}
      variant="ghost"
      gap="10px"
      padding="3px"
      borderRadius="10px"
      borderBottom="1px solid #292d35"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box
        display={"flex"}
        justifyContent="flex-start"
        alignItems="center"
        gap="10px"
      >
        <Avatar
          marginLeft="5px"
          boxSize="10"
          src={chat?.isGroupChat ? chat?.chatAvatar : sender?.pic}
          name={chat?.isGroupChat ? chat?.chatName : sender?.name}
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
            <Text>{chat?.isGroupChat ? chat?.chatName : sender?.name}</Text>
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
            {chat?.latestMessage?.content || "Start a chat"}
          </Text>
        </div>
      </Box>
      {notifications.find((msg) => msg?.chat?._id === chat?._id) && (
        <Badge ml="1" colorScheme="red">
          New
        </Badge>
      )}
    </Box>
  );
};

export default ChatProfile;
