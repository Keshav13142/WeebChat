import { Container, useToast } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatWindow from "../components/chats/ChatWindow";
import MyChats from "../components/chats/MyChats";
import NoChat from "../components/chats/NoChat";
import CreateGroup from "../components/modals/CreateGroup";
import Profile from "../components/modals/Profile";
import Search from "../components/modals/Search";
import { Context } from "../Context/ContextProvider";

const Chats = () => {
  const navigate = useNavigate();

  const {
    user,
    setUser,
    setSearchOpen,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    setChatLoading,
  } = useContext(Context);

  const toast = useToast();

  const fetchChats = async () => {
    setChatLoading(true);

    const response = await fetch("/api/chat", {
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      }),
    });

    setChatLoading(false);

    if (response.ok) {
      const data = await response.json();
      setChats(data);
    } else {
      toast({
        title: "Sesstion had expired",
        description: "Please log in again!!",
        duration: 3000,
        position: "top",
        status: "warning",
      });

      setUser(null);

      setChats([]);

      navigate("/");
    }
  };

  const createChat = async (e) => {
    setSearchOpen(false);
    const userId = JSON.parse(e.currentTarget.value)._id;

    if (!userId) return;

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
      }
      setSelectedChat(data);
    } else {
      toast({
        title: "Somthing went wrong!",
        duration: 3000,
        position: "top",
        status: "error",
      });
    }
  };

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
  }, [user]);

  return (
    <>
      <CreateGroup createChat={createChat} />

      <Profile />

      <Search createChat={createChat} />

      <Container
        padding="10px"
        display="flex"
        justifyContent="center"
        minW="100%"
        gap="10px"
        flexGrow="1"
      >
        <MyChats />
        {selectedChat ? <ChatWindow /> : <NoChat />}
      </Container>
    </>
  );
};

export default Chats;
