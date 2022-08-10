import React from "react";

import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorMode,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import { Context } from "../Context/ContextProvider";

const Home = () => {
  const navigate = useNavigate();

  const { user } = useContext(Context);

  useEffect(() => {
    if (user) {
      navigate("/chats");
    }
    // eslint-disable-next-line
  }, []);

  // eslint-disable-next-line
  const { colorMode, _ } = useColorMode();

  return (
    <Container
      margin={[2, 4]}
      maxW={["sm", "md"]}
      p={[2, 4]}
      borderRadius="10px"
    >
      <Box borderRadius="10px" padding="0.7rem" fontSize="3rem">
        <Tabs>
          <TabList>
            <Tab width="50%">Login</Tab>
            <Tab width="50%">SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
