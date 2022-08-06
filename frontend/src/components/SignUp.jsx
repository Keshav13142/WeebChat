import { Button, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import CustomInput from "./Input";
import { signUpInputs } from "../utils/inputFeilds";

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
    <>
      <VStack marginTop="10px" spacing="10px">
        {signUpInputs.map((inp, ind) => {
          return (
            <CustomInput
              key={ind}
              value={user[inp.name]}
              inp={inp}
              updateUser={updateUser}
            />
          );
        })}
      </VStack>
      <Button width="full" colorScheme="blue" stype="submit" onClick={signUp}>
        Sign Up
      </Button>
    </>
  );
};

export default SignUp;
