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
import SignUp from "../components/SignUp";
import Login from "../components/Login";

const Home = () => {
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
