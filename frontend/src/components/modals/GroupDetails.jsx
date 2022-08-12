import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { CgUserRemove } from "react-icons/cg";
import { Context } from "../../Context/ContextProvider";
import { findSender } from "../../utils/chatUtils";
import SelectUsers from "../SelectUsers";

const GroupDetails = () => {
  const {
    profileDetails,
    setProfileDetails,
    setSelectedChat,
    chats,
    setChats,
    user,
    setProfileOpen,
  } = useContext(Context);

  const toast = useToast();

  const [loading, setLoading] = useState(false);

  const [selectedId, setselectedId] = useState([]);

  const [userList, setUserList] = useState(
    profileDetails.isGroupChat &&
      Array.isArray(chats) &&
      chats?.map((item) =>
        !item.isGroupChat &&
        !profileDetails.users.find((u) => u._id === findSender(item, user)._id)
          ? findSender(item, user)
          : null
      )
  );

  const headers = {
    "Content-type": "application/json",
    Authorization: "Bearer " + user.token,
  };

  const removeUser = async (e) => {
    setLoading(true);

    const userId = e.currentTarget.value;

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
    } else {
      toast({
        title: "Something went wrong",
        description: "Unable to perform action....",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
    setLoading(false);
  };

  const leaveGroup = async () => {
    setLoading(true);
    if (user._id === profileDetails.groupAdmin._id) {
      toast({
        title: "You are the admin of the group",
        description: "Unable to perform action....",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }

    const response = await fetch("/api/group/leave", {
      method: "put",
      body: JSON.stringify({ chatId: profileDetails._id }),
      headers: new Headers(headers),
    });

    if (response.ok) {
      const data = await response.json();
      setChats([...chats.filter((item) => item._id !== data._id)]);
      setProfileOpen(false);
    } else {
      toast({
        title: "Something went wrong",
        description: "Unable to perform action....",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }

    setLoading(false);
  };

  const addUsers = async () => {
    if (selectedId.length === 0) {
      toast({
        title: "Select atleast 1 user",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setLoading(true);
    const response = await fetch("/api/group/adduser", {
      method: "put",
      body: JSON.stringify({
        chatId: profileDetails._id,
        userId: selectedId,
      }),
      headers: new Headers(headers),
    });

    if (response.ok) {
      const data = await response.json();
      setChats([...chats.filter((item) => item._id !== data._id), data]);
      setProfileDetails(data);
      setSelectedChat(data);
    } else {
      toast({
        title: "Something went wrong",
        description: "Unable to perform action....",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
    setselectedId([]);
    setLoading(false);
  };

  return (
    <>
      <Text textAlign="center" fontSize="18">
        Members
      </Text>
      {profileDetails?.users?.map((item) => {
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
                  {item._id === user._id && (
                    <Badge ml="1" colorScheme="green" variant="outline">
                      You
                    </Badge>
                  )}
                  {item._id === profileDetails.groupAdmin?._id && (
                    <Badge ml="1" colorScheme="red" variant="solid">
                      Admin
                    </Badge>
                  )}
                </Text>
                <Text fontSize="sm">{item.email}</Text>
              </Box>
            </Flex>
            {user._id === profileDetails?.groupAdmin?._id &&
              user._id !== item._id && (
                <IconButton
                  isLoading={loading}
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
      {profileDetails?.groupAdmin?._id === user._id && (
        <SelectUsers
          message=""
          loading={loading}
          addUsers={addUsers}
          selectedId={selectedId}
          setselectedId={setselectedId}
          userList={userList}
          setUserList={setUserList}
        />
      )}
      <Button
        isLoading={loading}
        bgColor="red.500"
        width="50%"
        alignSelf="center"
        marginTop="20px"
        onClick={leaveGroup}
      >
        Leave Group
      </Button>
    </>
  );
};

export default GroupDetails;
