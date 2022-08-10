import { IconButton, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { CgSearch } from "react-icons/cg";

const Search = ({ searchUser, loading }) => {
  const [query, setQuery] = useState("");

  const updateQuery = (e) => {
    setQuery(e.target.value);
  };
  return (
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
  );
};

export default Search;
