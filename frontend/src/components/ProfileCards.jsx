import { Avatar, Button, Text } from "@chakra-ui/react";
import React from "react";

const ProfileCards = ({ user, createChat }) => {
  return (
    <Button
      width="100%"
      variant="ghost"
      value={JSON.stringify(user)}
      cursor={"pointer"}
      display={"flex"}
      justifyContent="flex-start"
      alignItems="center"
      borderRadius="5px"
      _hover={{ backgroundColor: "#2c313d" }}
      gap="15px"
      padding="25px"
      onClick={createChat}
      borderBottom="1px solid #434455"
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
