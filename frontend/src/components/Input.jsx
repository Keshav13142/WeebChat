import { Text, Input } from "@chakra-ui/react";
import React from "react";

const CustomInput = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "5px",
      }}
    >
      <Text fontSize={"sm"}>{props.inp.label}</Text>
      <Input
        // borderColor={"red"}
        _placeholder={{ opacity: 0.7, color: "gray.500" }}
        variant="filled"
        placeholder={props.inp.placeholder}
        value={props.value}
        name={props.inp.name}
        type={props.inp.type}
        onChange={props.updateUser}
      />
    </div>
  );
};

export default CustomInput;
