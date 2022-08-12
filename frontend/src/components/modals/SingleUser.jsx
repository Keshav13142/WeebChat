import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const SingleUser = ({ profile }) => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      gap="10px"
    >
      <Avatar size="xl" src={profile?.pic} name={profile?.name} />
      <Box ml="3">
        <Text fontSize="20px">
          <span style={{ fontWeight: "bold" }}>Name</span> : {profile?.name}
        </Text>
        <Text fontSize="21px">
          <span style={{ fontWeight: "bold" }}>Email</span> : {profile?.email}
        </Text>
      </Box>
    </Flex>
  );
};

export default SingleUser;
