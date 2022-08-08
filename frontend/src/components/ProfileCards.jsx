import { Avatar, Button, Text } from "@chakra-ui/react";
import React from "react";

const ProfileCards = ({ user, createChat }) => {
  return (
    <Button
      minW={["280px"]}
      variant="ghost"
      name={user._id}
      cursor={"pointer"}
      onClick={createChat}
      p={7}
    >
      <div style={{ width: "40%", position: "absolute", left: "4px" }}>
        <Avatar src={user.pic} />
      </div>
      <div
        style={{
          width: "60%",
          display: "flex",
          position: "relative",
          left: "25px",
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
