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
  SkeletonCircle,
  SkeletonText,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { ChatContex } from "../../Context/chatProvider";
import ProfileCards from "../ProfileCards";

const SearchModal = ({ createChat }) => {
  const { user, isSearchOpen, setSearchOpen } = useContext(ChatContex);

  const [searchResult, setSearchResult] = useState([]);

  const [query, setQuery] = useState("");

  const [loading, setLoading] = useState(false);

  const searchUser = async (e) => {
    e.preventDefault();
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
      setSearchResult(response);
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
          {loading &&
            [...new Array(3)].map((item, ind) => (
              <Box key={ind} mb={5}>
                <SkeletonCircle />
                <SkeletonText noOfLines={2} mt="7px" />
              </Box>
            ))}
          {searchResult.length === 0 && !loading && (
            <Text textAlign="center">Search for your friends here!!</Text>
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
