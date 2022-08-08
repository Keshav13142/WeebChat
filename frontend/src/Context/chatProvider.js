import { createContext, useEffect, useState } from "react";

export const ChatContex = createContext();

const ChatProvider = ({ children }) => {
  const [chat, setChat] = useState([]);

  const [user, setUser] = useState({});

  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "dark");
    const userInfo = JSON.parse(localStorage.getItem("user"));

    setUser(userInfo);
    // eslint-disable-next-line
  }, []);

  return (
    <ChatContex.Provider
      value={{ chat, setChat, user, setUser, isOpen, setOpen }}
    >
      {children}
    </ChatContex.Provider>
  );
};

export default ChatProvider;
