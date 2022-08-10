import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [chats, setChats] = useState([]);

  const [user, setUser] = useState();

  const [selectedChat, setSelectedChat] = useState(null);

  const [displayUser, setDisplayUser] = useState();

  const [isSearchOpen, setSearchOpen] = useState(false);

  const [isGroupOpen, setGroupOpen] = useState(false);

  const [isProfileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "dark");

    let userInfo;
    if ((userInfo = JSON.parse(localStorage.getItem("user")))) {
      setUser(userInfo);
      navigate("/chats");
    }

    // eslint-disable-next-line
  }, []);

  return (
    <Context.Provider
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
        isGroupOpen,
        setGroupOpen,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
