import { IconButton, Input, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { CgSearch } from "react-icons/cg";
import { Context } from "../../Context/ContextProvider";

const SearchInput = ({ searchUser, loading, query, updateQuery }) => {
  const { isCreateOpen, isProfileOpen, isSearchOpen } = useContext(Context);
  return (
    <form
      onSubmit={
        isCreateOpen || isProfileOpen ? (e) => e.preventDefault() : searchUser
      }
      style={{
        width: "100%",
        height: "fit-content",
      }}
    >
      {isCreateOpen && <Text fontSize="sm">Search users</Text>}
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
          marginTop: isCreateOpen || isProfileOpen ? "5px" : "30px",
        }}
      >
        <Input
          onChange={updateQuery}
          placeholder="Name or email"
          value={query}
        />
        {isSearchOpen && (
          <IconButton
            type="submit"
            isLoading={loading}
            icon={<CgSearch />}
            size="md"
            onClick={searchUser}
          />
        )}
      </div>
    </form>
  );
};

export default SearchInput;
