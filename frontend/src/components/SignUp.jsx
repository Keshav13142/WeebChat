import { FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

const SignUp = () => {
  const [user, setuser] = useState({});

  return (
    <VStack marginTop="20px" spacing="5px">
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input placeholder="Enter your name" value={user.name} type="text" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input placeholder="Enter your email" value={user.email} type="email" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          placeholder="Enter your password"
          value={user.password}
          type="password"
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Confirm password</FormLabel>
        <Input
          placeholder="Confirm your password"
          value={user.conf_pass}
          type="password"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Profile picture</FormLabel>
        <Input value={user.pic} type="file" />
      </FormControl>
    </VStack>
  );
};

export default SignUp;
