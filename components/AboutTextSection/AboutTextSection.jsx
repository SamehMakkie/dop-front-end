import { Heading, Text, VStack } from "@chakra-ui/react";

const AboutTextSection = ({ title, children }) => {
  return (
    <VStack w="100%" spacing={10} alignItems={"start"}>
      <Heading as="h2" w="100%">
        {title}
      </Heading>
      <Text maxW={"800px"} lineHeight="200%">
        {children}
      </Text>
    </VStack>
  );
};

export default AboutTextSection;
