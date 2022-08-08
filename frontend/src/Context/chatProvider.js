import { createContext, useEffect, useState } from "react";

export const ChatContex = createContext();

const ChatProvider = ({ children }) => {
  const [chat, setChat] = useState([]);

  const [user, setUser] = useState({});

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
        chat,
        setChat,
        user,
        setUser,
        isSearchOpen,
        setSearchOpen,
        isProfileOpen,
        setProfileOpen,
      }}
    >
      {children}
    </ChatContex.Provider>
  );
};

export default ChatProvider;
