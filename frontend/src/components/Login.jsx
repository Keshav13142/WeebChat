import React, { useState } from "react";
import CustomInput from "./Input";
import { loginInputs } from "../utils/inputFeilds";
import { Button, useToast, VStack } from "@chakra-ui/react";
import axios from "axios";

const Login = () => {
  const toast = useToast();

  const showToast = (title, status, desc = "") => {
    toast({
      title: title,
      description: desc,
      status: status,
      duration: 2000,
      isClosable: true,
    });
  };

  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  const updateUser = (e) => {
    setuser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const login = async () => {
    if (user.email === "" || user.password === "") {
      showToast(
        "Email or password cannot be empty",
        "warning",
        "Please check your details !!"
      );
      return;
    }
    const data = await axios.post("/api/user/login", user);
    if (data.status === 200) {
      console.log(data.data);
      showToast("Login successful", "success", "Happy to see you!!");
      return;
    }
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
      <Button
        name="guest"
        width="full"
        colorScheme={"orange"}
        stype="submit"
        onClick={() => setuser({ email: "guest@gmail.com", password: "guest" })}
      >
        Get guest credentials (Try the app out!!🚀)
      </Button>
    </VStack>
  );
};

export default Login;
