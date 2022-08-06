import { Button, useToast, VStack, Text, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import CustomInput from "./Input";
import { signUpInputs } from "../utils/inputFeilds";
import axios from "axios";

const SignUp = () => {
  const toast = useToast();

  const [loading, setloading] = useState(false);

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
    name: "",
    email: "",
    password: "",
    conf_pass: "",
    pic: null,
  });

  const updateUser = (e) => {
    setuser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getBase64 = (e) => {
    setloading(true);
    const file = e.target.files[0];
    if (Math.round(file.size / 1000) > 5000) {
      showToast("File size must be less than 5mb", "warning");
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setuser((prev) => ({ ...prev, pic: reader.result }));
    };
    setloading(false);
  };

  const signUp = async () => {
    if (user.conf_pass !== user.password) {
      showToast(
        "Passwords do not match",
        "warning",
        "Please check your details!!"
      );
      return;
    } else if (user.email === "" || user.name === "" || user.password === "") {
      showToast("Please enter all the required details!!", "warning");
      return;
    }
    setloading(true);
    const data = await axios.post("/api/user/register", user);
    setloading(false);
    if (data.status === 200) {
      showToast(
        "Account created successfully",
        "success",
        "You're ready to chat now!!"
      );
      console.log(data.data);
    } else {
      console.log(data.data);
      showToast("Failed to create account", "error", "Please check !!");
    }
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
      <div className="input_container">
        <Text marginTop="10px" fontSize={"sm"}>
          Profile picture
        </Text>
        <Input
          variant="flushed"
          type="file"
          accept="image/*"
          onChange={getBase64.bind(this)}
        />
      </div>
      <Button
        isLoading={loading}
        width="full"
        colorScheme="blue"
        stype="submit"
        onClick={signUp}
      >
        Sign Up
      </Button>
    </>
  );
};

export default SignUp;
