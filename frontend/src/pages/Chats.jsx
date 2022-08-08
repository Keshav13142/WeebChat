import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchModal from "../components/SearchModal";
import { ChatContex } from "../Context/chatProvider";
import { users } from "../utils/mockUsers";

const Chats = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(ChatContex);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <SearchModal users={users} />
    </>
  );
};

export default Chats;
