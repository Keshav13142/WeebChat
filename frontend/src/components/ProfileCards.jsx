import { Avatar, Button, Text } from "@chakra-ui/react";
import React from "react";

const ProfileCards = ({ user, createChat }) => {
  return (
    <Button
      width="100%"
      variant="ghost"
      value={user._id}
      cursor={"pointer"}
      display={"flex"}
      justifyContent="start"
      alignItems="center"
      borderRadius="10px"
      _hover={{ backgroundColor: "#2c313d" }}
      gap="10px"
      padding="25px"
      onClick={createChat}
    >
      <Avatar marginLeft="5px" boxSize="10" src={user.pic} name={user.name} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          color: "white",
          gap: "3px",
        }}
      >
        <Text fontSize={18}>{user.name}</Text>
        <Text fontSize="15px" fontWeight="200">
          {user.email}
        </Text>
      </div>
    </Button>
  );
};

export default ProfileCards;
