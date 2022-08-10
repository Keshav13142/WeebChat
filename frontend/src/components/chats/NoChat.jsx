import { Box, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { Context } from "../../Context/ContextProvider";

const NoChat = () => {
  const { selectedChat } = useState(Context);
  return (
    <Box
      width={{ base: "100%", md: "70%" }}
      height="100%"
      bgColor="#12161f"
      borderRadius="10px"
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap="40px"
    >
      <Heading fontFamily="PT Sans">Select a chat to get started 🚀</Heading>
    </Box>
  );
};

export default NoChat;
