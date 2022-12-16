import {
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import NavigationWrapper from "../../views/NavigationWrapper/NavigationWrapper";
import PageStackSpacing from "../../views/PageStackSpacing/PageStackSpacing";
import Email from "../../views/UserInformationTabs/Email";
import Password from "../../views/UserInformationTabs/Password";
import Profile from "../../views/UserInformationTabs/Profile";

const information = () => {
  return (
    <NavigationWrapper>
      <ProtectedRoute>
        <PageStackSpacing>
          <Heading>Change User Information</Heading>
          <Tabs w="100%" isFitted colorScheme={"teal"}>
            <TabList>
              <Tab>Profile</Tab>
              <Tab>Email</Tab>
              <Tab>Password</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Profile />
              </TabPanel>
              <TabPanel>
                <Email />
              </TabPanel>
              <TabPanel>
                <Password />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </PageStackSpacing>
      </ProtectedRoute>
    </NavigationWrapper>
  );
};

export default information;
