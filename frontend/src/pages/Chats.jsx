import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchModal from "../components/modals/SearchModal";
import { ChatContex } from "../Context/chatProvider";

const Chats = () => {
  const navigate = useNavigate();

  const { user } = useContext(ChatContex);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    //eslint-disable-next-line
  }, []);

  const createChat = (e) => {
    const user_id = e.currentTarget.name;
    console.log(user_id);
  };

  return (
    <>
      <SearchModal createChat={createChat} />
    </>
  );
};

export default Chats;
