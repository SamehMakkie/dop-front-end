import { VStack } from "@chakra-ui/react";

const ContactPageStackSpacing = ({ children }) => {
  return (
    <VStack
      w="100%"
      px={[0, 10, 10, 32, 36]}
      pt={20}
      spacing={20}
      justifyContent="center">
      {children}
    </VStack>
  );
};

export default ContactPageStackSpacing;
