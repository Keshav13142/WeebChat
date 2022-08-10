import {
  Avatar,
  Button,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useToast,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Context } from "../../Context/ContextProvider";
import SearchInput from "../search/SearchInput";
import SearchResult from "../search/SearchResult";

const CreateGroup = ({
  // searchUser,
  message,
  // query,
  loading,
  // updateQuery,
  setLoading,
  // searchResult,
}) => {
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
    // displayUser,
  } = useContext(Context);

  const [group, setGroup] = useState({
    chatName: "",
    chatAvatar: "",
  });

  const { searchQuery, setSearchQuery } = useState("");

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

  const [selectedUsers, setselectedUsers] = useState([]);

  const [userList, setUserList] = useState(
    chats.slice(0, 5).map((item) => item.users[1])
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

  // const searchUser = () => {};

  const addUser = (e) => {
    const user = JSON.parse(e.currentTarget.value);
    if (!selectedUsers.find((item) => user._id === item._id)) {
      setselectedId([...selectedId, user._id]);
      setselectedUsers([...selectedUsers, user]);
    }
  };

  const createGroup = async () => {
    if (group.chatName.length === 0) {
      showToast("Please enter a group name", "warning", "top");
      return;
    }
    if (selectedId.length === 0) {
      showToast(
        "Minimum 2 members needed!!",
        "warning",
        "top",
        "Go get some friends 😢!"
      );
      return;
    }
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
      setChats(...chats, data);
      setSelectedChat(data);
      setGroupOpen(false);
    }
  };

  const removeUsers = (e) => {
    const id = e.currentTarget.value;
    setselectedUsers((prev) => {
      return prev.filter((item) => id !== item._id);
    });
    setselectedId((prev) => {
      return prev.filter((item) => id !== item);
    });
  };

  const updateSearch = (e) => {
    const key = e.currentTarget.value.toLowerCase();
    if (key.trim() === "") {
      setUserList(chats.slice(0, 5).map((item) => item.users[1]));
      return;
    }
    setUserList(
      chats.map((item) => {
        if (
          item.users[1].name.toLowerCase().includes(key) ||
          item.users[1].email.includes(key)
        )
          return item.users[1];
      })
    );
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
      <VStack marginTop="10px" spacing="10px">
        <Wrap>
          {selectedUsers.map((user, ind) => (
            <Tag key={ind} variant="solid" borderRadius="full" padding="5px">
              <Avatar mr="5px" src={user.pic} size="xs" name={user.name} />
              <TagLabel>{user.name}</TagLabel>
              <TagCloseButton value={user._id} onClick={removeUsers} />
            </Tag>
          ))}
        </Wrap>
        <SearchInput
          query={searchQuery}
          updateQuery={updateSearch}
          searchUser={updateSearch}
          loading={loading}
        />
        <Button
          isLoading={loading}
          width="full"
          colorScheme="blue"
          stype="submit"
          onClick={createGroup}
        >
          Create Group
        </Button>
        <SearchResult
          label=" "
          loading={loading}
          searchResult={userList}
          addUser={addUser}
          message={message}
        />
      </VStack>
    </>
  );
};

export default CreateGroup;
