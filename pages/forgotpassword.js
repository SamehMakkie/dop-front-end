import { Button, Flex, FormControl, Heading, Input, Text, VStack } from "@chakra-ui/react";

const ForgotPassword = () => {
  return (
    <Flex w="100%" minH="100vh" justifyContent={"center"} alignItems="center" bgColor={"gray.50"}>
      <VStack w="100%" maxW={"md"} p={10} spacing={5} bgColor="white" borderRadius={"2xl"} boxShadow="lg">
        <VStack w="100%" spacing={2}>
          <Heading>Forgot Your Password</Heading>
          <Text w="100%">You{"'"}ll get an email with a reset link</Text>
        </VStack>
        <FormControl>
            <Input w="100%" type="email" placeholder="john-doe@example.com" />
        </FormControl>
        <Button w="100%" colorScheme={"teal"}>Send</Button>
      </VStack>
    </Flex>
  );
};

export default ForgotPassword;
