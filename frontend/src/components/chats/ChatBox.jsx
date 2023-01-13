import {
  Box,
  Flex,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import ScrollableFeed from "react-scrollable-feed";
import { io } from "socket.io-client";
import { Context } from "../../Context/ContextProvider";
import { BACKEND_URL } from "../../utils/helpers";

var socket, selectedChatCompare;

const ChatBox = () => {
  const { user, selectedChat, notifications, setNotifications } =
    useContext(Context);

  const [messagesLoading, setMessagesLoading] = useState(false);

  const [sendLoading, setSendLoading] = useState(false);

  const [allMessages, setAllMessages] = useState([]);

  const [message, setMessage] = useState("");

  // const [isCurrentUserTyping, setIsCurrentUserTyping] = useState(false);

  // const [areOtherUsersTyping, setAreOtherUsersTyping] = useState(false);

  const [isSocketConnected, setIsSocketConnected] = useState(false);

  const toast = useToast();

  const fetchMessages = async () => {
    setMessagesLoading(true);

    const response = await fetch(
      `${BACKEND_URL}/api/message/${selectedChat._id}`,
      {
        method: "get",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      setAllMessages(data);
    } else {
      toast({
        title: "Unable to fetch messages!!",
        description: "Something went wrong 😥",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setMessagesLoading(false);
    socket.emit("join chat", selectedChat._id);
  };

  const typingHandler = (e) => {
    setMessage(e.target.value);

    // if (!isSocketConnected) return;
    // if (!isCurrentUserTyping) {
    //   setIsCurrentUserTyping(true);
    //   socket.emit("typing", selectedChat._id);
    // }
  };

  const sendMessage = async (e) => {
    if (message.trim().length === 0) return;
    if (e.currentTarget.name === "send" || e.key === "Enter") {
      setSendLoading(true);

      const response = await fetch(
        `${BACKEND_URL}/api/message/${selectedChat._id}`,
        {
          method: "post",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
          }),
          body: JSON.stringify({ content: message }),
        }
      );

      if (response.ok) {
        setMessage("");

        const data = await response.json();

        setAllMessages([...allMessages, data]);

        //Emit the message to the chat room
        socket.emit("new message", data);
      } else {
        toast({
          title: "Failed to send Message!!",
          description: "Something went wrong 😥",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }

      setSendLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    //eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);

    //Create a sockect conn with the server for the current user
    socket.emit("setup", user);
    socket.on("connected", () => setIsSocketConnected(true));

    //Check if there is any new messages on the chat
    socket.on("message received", (newMessage) => {
      //Check if the new message belongs to the selected chat
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessage.chat._id
      ) {
        //Display notification
        console.log("hello");
        if (!notifications.includes(newMessage)) {
          console.log("hello");
          setNotifications((prev) => [...prev, newMessage]);
        }
      } else {
        setAllMessages((prev) => [...prev, newMessage]);
      }
    });

    //Listen to typing events on the current chat
    // socket.on("typing", () => {
    //   setAreOtherUsersTyping(true);
    // });

    // //Listen to typing events on the current chat
    // socket.on("stopped typing", () => {
    //   setAreOtherUsersTyping(false);
    // });
  }, []);

  return (
    <Flex
      width="100%"
      direction="column"
      gap="10px"
      justifyContent="center"
      height="100%"
    >
      {messagesLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        <>
          <ScrollableFeed className="temp">
            {/* <Flex
              borderColor={"red"}
              borderWidth={"thin"}
              overflowY="scroll"
              className="custom-scrollbar"
              borderRadius="10px"
              flexDirection="column"
              justifyContent="flex-end"
              width="100%"
              bgColor="#161b26"
              gap={2}
              padding="5"
            > */}
            {allMessages.map((message) => (
              <Box
                alignSelf={
                  user._id === message.sender._id ? "flex-end" : "flex-start"
                }
                padding={1.5}
                borderRadius="10px"
                bgColor={
                  user._id === message.sender._id ? "#2d589a" : "#00834a"
                }
                key={message._id}
              >
                {message.content}
              </Box>
            ))}
            {/* </Flex> */}
          </ScrollableFeed>
          <Flex width="100%" gap="10px">
            <Input
              onKeyDown={sendMessage}
              value={message}
              onChange={typingHandler}
            />
            <IconButton
              isLoading={sendLoading}
              name="send"
              onClick={sendMessage}
              bg="none"
              icon={<AiOutlineSend />}
            />
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default ChatBox;
