import { Button, Input, Text, useToast, VStack } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context/ContextProvider";
import { signUpInputs } from "../utils/inputFeilds";
import CustomInput from "./Input";

const SignUp = () => {
  const toast = useToast();

  const navigate = useNavigate();

  const { setUser } = useContext(Context);

  const [loading, setLoading] = useState(false);

  const showToast = (title, status, desc = "") => {
    toast({
      title: title,
      description: desc,
      status: status,
      duration: 3000,
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
    setLoading(true);
    const file = e.target.files[0];
    if (Math.round(file.size / 1000) > 5000) {
      showToast("File size must be less than 5mb", "warning");
      setLoading(false);
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setuser((prev) => ({ ...prev, pic: reader.result }));
    };
    setLoading(false);
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
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!regex.test(user.email)) {
      showToast("Please enter a valid email!!", "warning");
      return;
    }
    setLoading(true);
    const headers = {
      "Content-type": "application/json",
    };
    const data = await fetch("/api/user/register", {
      method: "post",
      body: JSON.stringify(user),
      headers: new Headers(headers),
    });

    const response = await data.json();

    setLoading(false);

    if (data.ok) {
      console.log(response);
      showToast(
        "Account created successfully",
        "success",
        "You're ready to chat now!!"
      );
      setUser(response);
      localStorage.setItem("user", JSON.stringify(response));
      navigate("/chats");
      return;
    } else {
      showToast(response.error, "error");
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
