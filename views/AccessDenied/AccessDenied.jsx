import { Button, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

const AccessDenied = () => {
  const router = useRouter();
  return (
    <Flex
      w="100vw"
      h="100vh"
      justifyContent={"center"}
      alignItems="center"
      bgColor={"gray.50"}>
      <VStack
        w="!00%"
        maxW={"md"}
        p={10}
        spacing={5}
        bgColor="white"
        borderRadius={"2xl"}
        boxShadow="lg">
        <Heading>Access Denied</Heading>
        <Text w="100%">You need to be sign in to access this page</Text>
        <HStack w="100%">
          <Button
            w="100%"
            onClick={() => {
              router.push("/signin");
            }}>
            Sign In
          </Button>
          <Button
            w="100%"
            onClick={() => {
              router.push("/signup");
            }}>
            Register
          </Button>
        </HStack>
        <Button
          w="100%"
          onClick={() => {
            router.push("/");
          }}>
          Return to home page
        </Button>
      </VStack>
    </Flex>
  );
};

export default AccessDenied;
