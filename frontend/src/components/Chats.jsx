import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Chats = () => {
  const [chats, setchats] = useState([]);

  const fetchChats = async () => {
    const { data } = await axios.get("/api/chats");
    setchats(data);
  };

  useEffect(() => {
    fetchChats();
  });

  return (
    <>
      {chats.map((chat, ind) => {
        return <p key={ind}>{chat.chatName}</p>;
      })}
    </>
  );
};

export default Chats;
