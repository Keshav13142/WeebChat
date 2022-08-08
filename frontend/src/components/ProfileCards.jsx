import { Avatar, Button, Text } from "@chakra-ui/react";
import React from "react";

const ProfileCards = ({ user, createChat }) => {
  return (
    <Button
      value={user}
      variant="ghost"
      //   colorScheme="green"
      name={user.name}
      cursor={"pointer"}
      onClick={createChat}
      display="flex"
      p={7}
      gap={4}
      justifyContent="start"
    >
      <Avatar src={user.pic} />
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
        <Text>{user.email}</Text>
      </div>
    </Button>
  );
};

export default ProfileCards;
