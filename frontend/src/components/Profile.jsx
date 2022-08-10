import { Avatar, Badge, Box, Flex, IconButton, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { CgUserRemove } from "react-icons/cg";
import { Context } from "../Context/ContextProvider";

const Profile = () => {
  const {
    profileDetails,
    setProfileDetails,
    setSelectedChat,
    chats,
    setChats,
    user,
  } = useContext(Context);

  const removeUser = async (e) => {
    const userId = e.currentTarget.value;

    // console.log(user);
    // if () {
    //   toast({
    //     title: "You",
    //     description: desc,
    //     status: status,
    //     duration: 3000,
    //     isClosable: true,
    //   });
    //   return;
    // }

    const headers = {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.token,
    };

    const response = await fetch("/api/group/remove", {
      method: "put",
      body: JSON.stringify({ chatId: profileDetails._id, userId: userId }),
      headers: new Headers(headers),
    });

    if (response.ok) {
      const data = await response.json();
      setChats([...chats.filter((item) => item._id !== data._id), data]);
      setProfileDetails(data);
      setSelectedChat(data);
    }
  };

  return (
    <Box display="flex" alignItems="center" gap="3">
      <Box
        display="flex"
        justifyContent="start"
        gap="3"
        width="100%"
        flexDirection="column"
      >
        {!profileDetails.isGroupChat ? (
          <>
            <Avatar
              name={profileDetails?.users?.[1].name}
              src={profileDetails?.users?.[1].pic}
            />
            <Text>{profileDetails?.users?.[1].name}</Text>
          </>
        ) : (
          <>
            <Text textAlign="center" fontSize="18">
              Members
            </Text>
            {profileDetails.users.map((item) => {
              return (
                <Box
                  key={item._id}
                  justifyContent="space-between"
                  display="flex"
                  alignItems="center"
                  gap="3"
                >
                  <Flex>
                    <Avatar src={item.pic} name={item.name} />
                    <Box ml="3">
                      <Text fontWeight="bold">
                        {item.name}
                        {item._id === profileDetails.groupAdmin._id && (
                          <Badge ml="1" colorScheme="red" variant="solid">
                            Admin
                          </Badge>
                        )}
                      </Text>
                      <Text fontSize="sm">{item.email}</Text>
                    </Box>
                  </Flex>
                  {user._id === profileDetails.groupAdmin._id && (
                    <IconButton
                      value={item._id}
                      bg="none"
                      color="red.400"
                      icon={<CgUserRemove />}
                      onClick={removeUser}
                    />
                  )}
                </Box>
              );
            })}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
