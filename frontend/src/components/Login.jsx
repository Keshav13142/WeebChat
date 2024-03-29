import { Button, useToast, VStack } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context/ContextProvider";
import { BACKEND_URL } from "../utils/helpers";
import { loginInputs } from "../utils/inputFeilds";
import CustomInput from "./Input";

const Login = () => {
  const { setUser } = useContext(Context);

  const toast = useToast();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

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

  const headers = {
    "Content-type": "application/json",
  };

  const login = async (e) => {
    if (user.email === "" || user.password === "") {
      showToast("Email or password can't be empty", "warning");
      return;
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!regex.test(user.email)) {
      showToast("Please enter a valid email!!", "warning");
      return;
    }
    setLoading(true);

    const data = await fetch(`${BACKEND_URL}/api/user/login`, {
      method: "post",
      body: JSON.stringify(user),
      headers: new Headers(headers),
    });

    const response = await data.json();

    setLoading(false);

    if (data.ok) {
      showToast("Login successful", "success", "Happy to see you!!");
      setUser(response);
      localStorage.setItem("user", JSON.stringify(response));
      navigate("/chats");
    } else {
      showToast(response.error, "error");
    }
  };

  const guestLogin = async (guest) => {
    setLoading(true);
    const data = await fetch(`${BACKEND_URL}/api/user/login`, {
      method: "post",
      body: JSON.stringify(guest),
      headers: new Headers(headers),
    });

    const response = await data.json();

    setLoading(false);

    if (data.ok) {
      showToast("Login successful", "success");
      setUser(response);
      localStorage.setItem("user", JSON.stringify(response));
      navigate("/chats");
    } else {
      showToast(response.error, "error");
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
      <Button
        isLoading={loading}
        width="full"
        colorScheme={"blue"}
        stype="submit"
        onClick={login}
      >
        Login
      </Button>
      <Button
        isLoading={loading}
        type="button"
        name="guest"
        width="full"
        colorScheme="purple"
        onClick={() =>
          guestLogin({ email: "guest@gmail.com", password: "guest" })
        }
      >
        Try the app out as a Guest!!🚀
      </Button>
    </VStack>
  );
};

export default Login;
