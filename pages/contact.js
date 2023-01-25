import { VStack } from "@chakra-ui/react";
import ContactUs from "../views/ContactUS/ContactUs";
import NavigationWrapper from "../views/NavigationWrapper/NavigationWrapper";
import ContactPageStackSpacing from "../views/PageStackSpacing/ContactPageStackSpacing";

const Contact = () => {
  return (
    <NavigationWrapper>
      <ContactPageStackSpacing>
        <VStack minH={"41vh"}>
            <ContactUs />
        </VStack>
      </ContactPageStackSpacing>
    </NavigationWrapper>
  );
};

export default Contact;
