import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Context } from "../Context/ContextProvider";
import CreateGroup from "./chats/CreateGroup";
import Profile from "./Profile";
import SearchInput from "./search/SearchInput";
import SearchResult from "./search/SearchResult";

const CustomModal = ({ createChat }) => {
  const {
    user,
    isSearchOpen,
    setSearchOpen,
    // selectedChat,
    // setSelectedChat,
    // chats,
    isProfileOpen,
    setProfileOpen,
    isGroupOpen,
    setGroupOpen,
    profileDetails,
  } = useContext(Context);

  const toast = useToast();

  const [searchResult, setSearchResult] = useState([]);

  const [message, setMessage] = useState("");

  const [query, setQuery] = useState("");

  const [loading, setLoading] = useState(false);

  const searchUser = async (e) => {
    e.preventDefault();
    if (query.trim().length === 0) {
      toast({
        title: "No friends 🙀??",
        status: "info",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setSearchResult([]);

    setLoading(true);

    const data = await fetch(`/api/user?search=${query}`, {
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      }),
    });

    setLoading(false);

    if (data.ok) {
      const response = await data.json();
      if (response.length === 0) {
        setMessage("No matches found 😶");
        return;
      }

      setSearchResult(response);
    } else {
      toast({
        title: "Could not connect!!",
        description: "Something went wrong 😥",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const updateQuery = (e) => {
    setQuery(e.target.value);
  };

  return (
    <Modal
      size={["xs", "sm"]}
      scrollBehavior="inside"
      isOpen={isSearchOpen || isGroupOpen || isProfileOpen}
      onClose={() => {
        setSearchOpen(false);
        setGroupOpen(false);
        setProfileOpen(false);
        setSearchResult([]);
        setQuery("");
        setMessage("");
      }}
    >
      <ModalOverlay />
      <ModalContent height="fit-content">
        <ModalHeader height="fit-content">
          {isSearchOpen && (
            <SearchInput
              query={query}
              updateQuery={updateQuery}
              searchUser={searchUser}
              loading={loading}
            />
          )}
          {isProfileOpen && (
            <Text
              rounded="full"
              color="cyan.200"
              fontSize="25"
              textAlign="center"
            >
              {profileDetails.isGroupChat
                ? profileDetails.chatName
                : profileDetails.users?.[1].name}
            </Text>
          )}
          {isGroupOpen && (
            <Text fontSize="25" textAlign="center">
              Create a new Group
            </Text>
          )}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="custom-scrollbar-search">
          {isSearchOpen && (
            <SearchResult
              loading={loading}
              searchResult={searchResult}
              createChat={createChat}
              message={message}
            />
          )}
          {isProfileOpen && <Profile />}
          {isGroupOpen && (
            <CreateGroup
              loading={loading}
              searchResult={searchResult}
              createChat={createChat}
              message={message}
              updateQuery={updateQuery}
              searchUser={searchUser}
              setLoading={setLoading}
            />
          )}
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
