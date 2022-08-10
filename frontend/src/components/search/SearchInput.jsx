import { IconButton, Input } from "@chakra-ui/react";
import { CgSearch } from "react-icons/cg";

const SearchInput = ({ searchUser, loading, query, updateQuery }) => {
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

export default SearchInput;
