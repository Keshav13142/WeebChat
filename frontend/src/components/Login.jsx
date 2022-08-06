import React, { useState } from "react";
import CustomInput from "./Input";
import { loginInputs } from "../utils/inputFeilds";
import { Button, VStack } from "@chakra-ui/react";
const Login = () => {
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const updateUser = (e) => {
    setuser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const login = () => {
    if (user.conf_pass !== user.password) console.log("Check pass");
    console.log(user);
  };
  return (
    <VStack marginTop="10px" spacing="23px">
      {loginInputs.map((inp, ind) => {
        return (
          <CustomInput
            key={ind}
            value={user[inp.name]}
            inp={inp}
            updateUser={updateUser}
          />
        );
      })}
      <Button width="full" colorScheme={"blue"} stype="submit" onClick={login}>
        Login
      </Button>
    </VStack>
  );
};

export default Login;
