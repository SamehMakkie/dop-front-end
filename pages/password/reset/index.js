import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import resetPassword from "../../../services/restPassword";

const Reset = () => {
  const user = useSelector((state) => state.userReducer.value);
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleEmailRest = async () => {
    toast({
      title: "Processing request",
      description: "Your request is being processed, please wait...",
      position: "top-right",
    });
    const res = await resetPassword(email);
    if (res.code >= 0) {
      setIsSent(true);
      toast({
        title: "Redirecting to home page in 3 seconds",
        description:
          "Password reset request sent, you will be redirected back to the Sign In page in 3 seconds...",
        status: "success",
        position: "top-right",
        duration: 2800
      });
      setTimeout(() => {
        router.push("/signin");
      }, 3000);
    } else {
      setTimeout(() => {
        toast({
          title: "Request failed",
          description: "Something went wrong, please try again.",
          position: "top-right",
          status: "error",
        });
      }, 3000);
    }
  };

  const handleEmailChange = (e) => {
    if (!hasChanged) {
      setHasChanged(true);
    }
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, []);

  return (
    <Flex
      w="100%"
      minH="100vh"
      justifyContent={"center"}
      alignItems="center"
      bgColor={"gray.50"}>
      {!user && (
        <VStack
          w="100%"
          maxW={"md"}
          p={10}
          spacing={5}
          bgColor="white"
          borderRadius={"2xl"}
          boxShadow="lg">
          <VStack w="100%" spacing={2}>
            {isSent && <CheckCircleIcon boxSize={"50px"} color={"green.500"} />}
            <Heading>Forgot Your Password</Heading>
            <Text w="100%">You{"'"}ll get an email with a reset password</Text>
          </VStack>
          <FormControl isRequired isInvalid={hasChanged && email == ""}>
            <Input
              w="100%"
              type="email"
              onChange={handleEmailChange}
              value={email}
              placeholder="john-doe@example.com"
            />
          </FormControl>
          <Button
            w="100%"
            colorScheme={"teal"}
            onClick={handleEmailRest}
            isDisabled={email == ""}>
            Send
          </Button>
        </VStack>
      )}
    </Flex>
  );
};

export default Reset;
