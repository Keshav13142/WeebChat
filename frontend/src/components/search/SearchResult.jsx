import { Text, VStack } from "@chakra-ui/react";
import React from "react";
import CustomSkeleton from "../CustomSkeleton";
import ProfileCards from "../ProfileCards";

const SearchResult = ({
  loading,
  searchResult,
  createChat,
  message,
  label,
  addUser,
}) => {
  return (
    <>
      {loading && <CustomSkeleton number={1} lines={2} />}
      {searchResult.length === 0 && !loading && (
        <Text fontWeight="300" fontSize="18px" textAlign="center">
          {message.length === 0
            ? label || "Search for your friends here!!"
            : message}
        </Text>
      )}
      <VStack width="100%" spacing={"15px"}>
        {searchResult.map((item, ind) => {
          if (!item) return null;
          return (
            <ProfileCards
              key={ind}
              user={item}
              createChat={createChat || addUser}
            />
          );
        })}
      </VStack>
    </>
  );
};

export default SearchResult;
