import { IconButton, Input, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { CgSearch } from "react-icons/cg";
import { Context } from "../../Context/ContextProvider";

const SearchInput = ({ searchUser, loading, query, updateQuery }) => {
  const { isGroupOpen } = useContext(Context);
  return (
    <form
      onSubmit={isGroupOpen ? (e) => e.preventDefault() : searchUser}
      style={{
        marginTop: isGroupOpen ? "" : "30px",
        width: "100%",
        height: "fit-content",
      }}
    >
      {isGroupOpen && <Text fontSize="sm">Search users</Text>}
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
          marginTop: isGroupOpen ? "10px" : "30px",
        }}
      >
        <Input
          onChange={updateQuery}
          placeholder="Name or email"
          value={query}
        />
        {!isGroupOpen && (
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
