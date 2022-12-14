import {
  Avatar,
  Button,
  Flex,
  Tag,
  TagCloseButton,
  TagLabel,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { HiUserAdd } from "react-icons/hi";
import { TiCancel } from "react-icons/ti";
import { Context } from "../Context/ContextProvider";
import { findSender } from "../utils/chatUtils";
import SearchInput from "./search/SearchInput";
import SearchResult from "./search/SearchResult";

const SelectUsers = ({
  message,
  loading,
  createGroup,
  selectedId,
  setselectedId,
  addUsers,
  userList,
  setUserList,
}) => {
  const {
    user,
    chats,
    isCreateOpen,
    profileDetails,
    showAddUsers,
    setShowAddUsers,
  } = useContext(Context);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedUsers, setselectedUsers] = useState([]);

  useEffect(() => {
    setUserList(
      chats?.map((item) =>
        !item.isGroupChat &&
        !profileDetails?.users?.find(
          (u) => u._id === findSender(item, user)._id
        )
          ? findSender(item, user)
          : null
      )
    );
    setselectedUsers([]);
    //eslint-disable-next-line
  }, [profileDetails]);

  const addUser = (e) => {
    const user = JSON.parse(e.currentTarget.value);
    if (!selectedUsers.find((item) => user._id === item._id)) {
      setselectedId([...selectedId, user._id]);
      setselectedUsers([...selectedUsers, user]);
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

    setSearchQuery(key);

    if (key.trim() === "") {
      isCreateOpen
        ? setUserList(
            chats
              ?.slice(0, 10)
              .map((item) =>
                !item.isGroupChat ? findSender(item, user) : null
              )
          )
        : setUserList(
            chats?.map((item) =>
              !item.isGroupChat &&
              !profileDetails.users.find(
                (u) => u._id === findSender(item, user)._id
              )
                ? findSender(item, user)
                : null
            )
          );
      return;
    }

    setUserList(
      isCreateOpen
        ? chats?.map((item) => {
            if (
              !item.isGroupChat &&
              (findSender(item, user).name.toLowerCase().includes(key) ||
                findSender(item, user).email.toLowerCase().includes(key))
            )
              return findSender(item, user);
            return null;
          })
        : chats?.map((item) => {
            if (
              (findSender(item, user).name.toLowerCase().includes(key) ||
                findSender(item, user).email.toLowerCase().includes(key)) &&
              !item.isGroupChat &&
              !profileDetails.users.find(
                (u) => u._id === findSender(item, user)._id
              )
            ) {
              return findSender(item, user);
            } else {
              return null;
            }
          })
    );
  };

  return (
    <VStack marginTop="10px" spacing="10px">
      <Wrap m={0} p={0}>
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
      <Flex width="100%" justifyContent="center" alignItems="center" gap="10px">
        <Button
          size="sm"
          width="50%"
          isLoading={loading}
          colorScheme="green"
          stype="submit"
          onClick={createGroup || addUsers}
          rightIcon={showAddUsers && <HiUserAdd />}
        >
          {isCreateOpen ? "Create group" : "Add users"}
        </Button>
        {showAddUsers && (
          <Button
            size="sm"
            width="50%"
            colorScheme="red"
            rightIcon={<TiCancel />}
            onClick={() => setShowAddUsers(false)}
          >
            Cancel
          </Button>
        )}
      </Flex>
      <SearchResult
        label=" "
        loading={loading}
        searchResult={userList}
        addUser={addUser}
        message={message}
      />
    </VStack>
  );
};

export default SelectUsers;
