import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const SignUp = () => {
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
    conf_pass: "",
    pic: "",
  });
  const updateUser = (e) => {
    setuser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const signUp = () => {
    if (user.conf_pass !== user.password) console.log("Check pass");
    console.log(user);
  };

  return (
    <VStack marginTop="20px" spacing="10px">
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          value={user.name}
          name="name"
          type="text"
          onChange={updateUser}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          name="email"
          value={user.email}
          type="email"
          onChange={updateUser}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          name="password"
          placeholder="Enter your password"
          value={user.password}
          type="password"
          onChange={updateUser}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Confirm password</FormLabel>
        <Input
          placeholder="Confirm your password"
          name="conf_pass"
          value={user.conf_pass}
          type="password"
          onChange={updateUser}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Profile picture</FormLabel>
        <Input value={user.pic} name="pic" type="file" onChange={updateUser} />
      </FormControl>
      <Button stype="submit" onClick={signUp}>
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
