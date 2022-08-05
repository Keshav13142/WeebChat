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
import SignUp from "./SignUp";

const Home = () => {
  // eslint-disable-next-line
  const { colorMode, _ } = useColorMode();
  return (
    <Container
      backgroundColor={colorMode === "dark" ? "#011627" : "#e5e5e5"}
      margin={[2, 4, 6, 8]}
      maxW={["sm", "md", "xl"]}
      p={[2, 4]}
      borderRadius="10px"
    >
      <Box borderRadius="10px" padding="0.7rem" fontSize="3rem">
        <Tabs variant="soft-rounded">
          <TabList>
            <Tab width="50%">Login</Tab>
            <Tab width="50%">SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>Login</TabPanel>
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
