import { Box, Container } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatBox from "../components/chats/ChatBox";
import MyChats from "../components/chats/MyChats";
import NoChat from "../components/chats/NoChat";
import ProfileModal from "../components/modals/ProfileModal";
import SearchModal from "../components/modals/SearchModal";
import { ChatContex } from "../Context/chatProvider";

const Chats = () => {
  const navigate = useNavigate();

  const {
    user,
    setSearchOpen,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
  } = useContext(ChatContex);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    fetchChats();

    document.addEventListener("keydown", (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    });

    //eslint-disable-next-line
  }, []);

  const fetchChats = async () => {
    const response = await fetch("/api/chat", {
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      setChats(data);
    }
  };

  const createChat = async (e) => {
    setSearchOpen(false);
    const userId = e.currentTarget.name;

    const response = await fetch("/api/chat", {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      }),
      body: JSON.stringify({ userId: userId }),
    });

    if (response.ok) {
      const data = await response.json();
      if (!chats.find((item) => item._id === data._id)) {
        setChats([...chats, data]);
        setSelectedChat(data);
      }
    }
  };

  return (
    <>
      <SearchModal createChat={createChat} />
      <ProfileModal />
      <Container
        padding="10px"
        display="flex"
        justifyContent="center"
        minW="100%"
        gap="10px"
        flexGrow="1"
      >
        <MyChats />
        {selectedChat ? <ChatBox /> : <NoChat />}
      </Container>
    </>
  );
};

export default Chats;
