import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Context } from "../../Context/ContextProvider";
import SearchInput from "../search/SearchInput";
import SearchResult from "../search/SearchResult";

const Search = ({ createChat }) => {
  const { user, isSearchOpen, setSearchOpen } = useContext(Context);

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

    const response = await fetch(`/api/user?search=${query}`, {
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      }),
    });

    setLoading(false);

    if (response.ok) {
      const data = await response.json();
      if (data.length === 0) {
        setMessage("No matches found 😶");
        return;
      }
      setSearchResult(data);
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
      isOpen={isSearchOpen}
      onClose={() => {
        setSearchOpen(false);
        setSearchResult([]);
        setQuery("");
        setMessage("");
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader height="fit-content">
          <SearchInput
            query={query}
            updateQuery={updateQuery}
            searchUser={searchUser}
            loading={loading}
          />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="scroll" className="custom-scrollbar-search">
          <SearchResult
            loading={loading}
            searchResult={searchResult}
            createChat={createChat}
            message={message}
          />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Search;
