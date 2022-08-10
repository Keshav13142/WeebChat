import { Button, Input, Text, useToast } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { ChatContex } from "../../Context/ContextProvider";
import SearchInput from "../search/SearchInput";
import SearchResult from "../search/SearchResult";

const CreateGroup = ({
  searchUser,
  message,
  query,
  loading,
  updateQuery,
  setLoading,
  searchResult,
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
  } = useContext(ChatContex);

  const [group, setGroup] = useState({
    chatName: "",
    chatAvatar: "",
  });
  //   const [message, setMessage] = useState("");

  //   const [query, setQuery] = useState("");

  //   const [loading, setLoading] = useState(false);

  //   const updateQuery = (e) => {
  //     setQuery(e.target.value);
  //   };

  const toast = useToast();

  //   const [searchResult, setSearchResult] = useState([]);

  const [selectedUsers, setSelectedUsers] = useState([]);

  const getBase64 = (e) => {
    setLoading(true);
    const file = e.target.files[0];
    if (Math.round(file.size / 1000) > 5000) {
      toast({
        title: "File size must be less than 5mb",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
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

  const addUser = (e) => {
    setSelectedUsers([...selectedUsers, e.currentTarget.value]);
    console.log(selectedUsers);
  };

  const createGroup = async () => {
    const response = await fetch("/api/group", {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      }),
      body: JSON.stringify({ ...group, users: selectedUsers }),
    });

    if (response.ok) {
      const data = await response.json();
      setChats(...chats, data);
      setSelectedChat(data);
      setGroupOpen(false);
    }
  };

  return (
    <>
      <div className="input_container">
        <Text marginTop="10px" fontSize={"sm"}>
          Group name
        </Text>
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
          cursor="pointer"
          variant="outlined"
          type="file"
          accept="image/*"
          onChange={getBase64.bind(this)}
        />
      </div>
      <SearchInput
        query={query}
        updateQuery={updateQuery}
        searchUser={searchUser}
        loading={loading}
      />
      <SearchResult
        label="Add users to group"
        loading={loading}
        searchResult={searchResult}
        addUser={addUser}
        message={message}
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
    </>
  );
};

export default CreateGroup;
