import {
  Flex,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { Context } from "../../Context/ContextProvider";
import { BACKEND_URL } from "../../utils/helpers";
const ChatBox = () => {
  const {
    chats,
    user,
    selectedChat,
    chatLoading,
    // isCreateOpen,
    setCreateOpen,
    // setChats,
    // setUser,
    // isSearchOpen,
    // setSearchOpen,
    // isProfileOpen,
    // setProfileOpen,
    // setSelectedChat,
  } = useContext(Context);

  const [messagesLoading, setMessagesLoading] = useState(false);

  const [sendLoading, setSendLoading] = useState(false);

  const [allMessages, setAllMessages] = useState([]);

  const [message, setMessage] = useState("");

  const toast = useToast();

  useEffect(() => {
    fetchMessages();
    console.log(allMessages);
    //eslint-disable-next-line
  }, [selectedChat]);

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
  };

  const typingHandler = (e) => {
    setMessage(e.target.value);
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
        console.log(data);
        setAllMessages([...allMessages, data]);
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

  return (
    <Flex
      flexGrow={1}
      width="100%"
      direction="column"
      gap="10px"
      justifyContent="center"
      alignItems="center"
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
          <Flex
            overflowY="scroll"
            className="custom-scrollbar"
            borderRadius="10px"
            flexDirection="column"
            justifyContent="flex-end"
            width="100%"
            bgColor="#161b26"
            flexGrow={1}
          >
            {allMessages.map((message) => (
              <Text
                style={
                  user._id === message.sender._id
                    ? { position: "fixed", right: 0 }
                    : {}
                }
                key={message._id}
              >
                {message.content}
              </Text>
            ))}
          </Flex>
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
