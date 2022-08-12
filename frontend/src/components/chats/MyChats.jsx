import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { RiAddFill } from "react-icons/ri";
import { Context } from "../../Context/ContextProvider";
import CustomSkeleton from "../CustomSkeleton";
import ChatProfile from "./ChatProfile";

const MyChats = () => {
  const {
    chats,
    selectedChat,
    chatLoading,
    // isCreateOpen,
    setCreateOpen,
    // setChats,
    // setUser,
    // isSearchOpen,
    // setSearchOpen,
    // isProfileOpen,
    // setProfileOpen,
    // setSelectedChat,
  } = useContext(Context);

  return (
    <Box
      backgroundColor="#12161f"
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection="column"
      justifyContent="center"
      alignItems="start"
      width={{ base: "100%", md: "30%" }}
      gap="9px"
      padding="10px"
      borderRadius="10px"
    >
      <Box
        height="fit-content"
        width="100%"
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        padding="5px"
      >
        <Heading fontSize="20">My Chats</Heading>
        <Button
          size={["sm"]}
          rightIcon={<RiAddFill />}
          onClick={() => setCreateOpen(true)}
        >
          Group
        </Button>
      </Box>
      <Box height="100%" width="100%">
        {chatLoading && <CustomSkeleton lines={4} number={2} />}
        {chats.length === 0 && !chatLoading ? (
          <>
            <Text marginTop="13rem" textAlign="center" fontSize="16">
              Conversations you have will appear here....
            </Text>
            <Text textAlign="center" fontSize="16">
              Search for users to get started
            </Text>
          </>
        ) : (
          <VStack
            className="custom-scrollbar"
            maxH="80vh"
            align="start"
            overflowY="scroll"
            padding="0"
            spacing={["5px", "10px"]}
          >
            {Array.isArray(chats) &&
              chats?.map((chat) => <ChatProfile chat={chat} key={chat._id} />)}
          </VStack>
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
