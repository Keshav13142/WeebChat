import {
  Box,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { ChatContex } from "../../Context/chatProvider";
import CustomSkeleton from "../CustomSkeleton";
import ProfileCards from "../ProfileCards";

const SearchModal = ({ createChat }) => {
  const { user, isSearchOpen, setSearchOpen, setSelectedChat, chats } =
    useContext(ChatContex);

  const toast = useToast();

  const [message, setMessage] = useState("");

  const [searchResult, setSearchResult] = useState([]);

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
      size={["xs"]}
      scrollBehavior="inside"
      isOpen={isSearchOpen}
      onClose={() => {
        setSearchOpen(false);
        setMessage("");
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <form onSubmit={searchUser}>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "30px",
              }}
            >
              <Input
                onChange={updateQuery}
                placeholder="Name or email"
                value={query}
              />
              <IconButton
                type="submit"
                isLoading={loading}
                icon={<CgSearch />}
                size="md"
                onClick={searchUser}
              />
            </div>
          </form>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="custom-scrollbar">
          {loading && <CustomSkeleton number={1} lines={2} />}
          {searchResult.length === 0 && !loading && (
            <Text fontWeight="300" fontSize="18px" textAlign="center">
              {message.length === 0
                ? "Search for your friends here!!"
                : message}
            </Text>
          )}
          <VStack spacing={"10px"}>
            {searchResult.map((item, ind) => (
              <ProfileCards key={ind} user={item} createChat={createChat} />
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SearchModal;
