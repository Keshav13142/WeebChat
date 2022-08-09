import { createContext, useEffect, useState } from "react";

export const ChatContex = createContext();

const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);

  const [user, setUser] = useState();

  const [selectedChat, setSelectedChat] = useState(null);

  const [displayUser, setDisplayUser] = useState();

  const [isSearchOpen, setSearchOpen] = useState(false);

  const [isProfileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "dark");
    const userInfo = JSON.parse(localStorage.getItem("user"));

    setUser(userInfo);
    // eslint-disable-next-line
  }, []);

  return (
    <ChatContex.Provider
      value={{
        chats,
        setChats,
        user,
        setUser,
        isSearchOpen,
        setSearchOpen,
        isProfileOpen,
        setProfileOpen,
        selectedChat,
        setSelectedChat,
        displayUser,
        setDisplayUser,
      }}
    >
      {children}
    </ChatContex.Provider>
  );
};

export default ChatProvider;
