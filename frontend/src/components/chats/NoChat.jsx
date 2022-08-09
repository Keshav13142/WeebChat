import { Box, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatContex } from "../../Context/chatProvider";

const NoChat = () => {
  const { selectedChat } = useState(ChatContex);
  return (
    <Box
      width={{ base: "100%", md: "70%" }}
      height="100%"
      bgColor="#0f131a"
      borderRadius="10px"
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      justifyContent="center"
      alignItems="center"
    >
      <Heading fontFamily="PT Sans">Select a chat to get started 🚀</Heading>
    </Box>
  );
};

export default NoChat;
