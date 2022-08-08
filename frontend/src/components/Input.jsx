import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

const CustomInput = ({ inp, value, updateUser }) => {
  const [show, setshow] = useState(false);
  return (
    <div className="input_container">
      <Text fontSize={"sm"}>{inp.label}</Text>
      <InputGroup>
        <Input
          accept={inp.type === "file" ? "image/*" : ""}
          _placeholder={{ opacity: 0.7, color: "gray.500" }}
          variant="filled"
          placeholder={inp.placeholder}
          value={value}
          name={inp.name}
          type={show ? "text" : inp.type}
          onChange={updateUser}
        />
        {inp.type === "password" && (
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => setshow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
    </div>
  );
};

export default CustomInput;
