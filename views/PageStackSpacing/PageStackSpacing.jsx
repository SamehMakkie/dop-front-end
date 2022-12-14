import { VStack } from "@chakra-ui/react";

const PageStackSpacing = ({ children }) => {
  return (
    <VStack
      w="100%"
      px={[5, 10, 10, 32, 36]}
      pt={20}
      spacing={20}
      justifyContent="center">
      {children}
    </VStack>
  );
};

export default PageStackSpacing;
