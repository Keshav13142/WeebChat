import { Input, Text, useToast } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Context } from "../../Context/ContextProvider";
import { findSender } from "../../utils/chatUtils";
import SelectUsers from "../SelectUsers";

const CreateGroup = ({ message, loading, setLoading }) => {
  const {
    // eslint-disable-next-line
    user,
    setChats,
    chats,
    setSelectedChat,
    // isSearchOpen,
    // setSearchOpen,
    // isProfileOpen,
    // setProfileOpen,
    // isGroupOpen,
    setGroupOpen,
    // profileDetails,
  } = useContext(Context);

  const [group, setGroup] = useState({
    chatName: "",
    chatAvatar: "",
  });

  const toast = useToast();

  const showToast = (title, status, position, desc = "") => {
    toast({
      title: title,
      description: desc,
      position: position,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  };

  const [selectedId, setselectedId] = useState([]);

  const [userList, setUserList] = useState(
    Array.isArray(chats) &&
      chats
        ?.slice(0, 10)
        .map((item) => (!item.isGroupChat ? findSender(item, user) : null))
  );

  const getBase64 = (e) => {
    setLoading(true);
    const file = e.target.files[0];
    if (Math.round(file.size / 1000) > 5000) {
      showToast("File size must be less than 5mb", "warning");
      setLoading(false);
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setGroup((prev) => ({ ...prev, chatAvatar: reader.result }));
    };
    setLoading(false);
  };

  const createGroup = async () => {
    if (group.chatName.length === 0) {
      showToast("Please enter a group name", "warning", "top");
      return;
    }
    if (selectedId.length < 2) {
      showToast(
        "Minimum 2 members needed!!",
        "info",
        "top",
        "You lonely?? 😂!"
      );
      return;
    }

    setLoading(true);

    const response = await fetch("/api/group", {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      }),
      body: JSON.stringify({ ...group, users: selectedId }),
    });

    if (response.ok) {
      const data = await response.json();
      setChats([...chats, data]);
      setSelectedChat(data);
      setGroupOpen(false);
    } else {
      toast({
        title: "Could not connect!!",
        description: "Something went wrong 😥",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }

    setLoading(false);
  };

  return (
    <>
      <div className="input_container">
        <Text fontSize={"sm"}>Group name</Text>
        <Input
          name="chatName"
          value={group.chatName}
          onChange={(e) => {
            setGroup({ ...group, [e.target.name]: e.target.value });
          }}
        />
      </div>
      <div className="input_container">
        <Text marginTop="10px" fontSize={"sm"}>
          Group icon
        </Text>
        <Input
          size="xs"
          cursor="pointer"
          variant="outlined"
          type="file"
          accept="image/*"
          onChange={getBase64.bind(this)}
        />
      </div>

      <SelectUsers
        message={message}
        loading={loading}
        createGroup={createGroup}
        selectedId={selectedId}
        setselectedId={setselectedId}
        userList={userList}
        setUserList={setUserList}
      />
    </>
  );
};

export default CreateGroup;
