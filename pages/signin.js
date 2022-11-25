import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link as A,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Signin = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const user = useSelector((state) => state.userReducer.value);
  const router = useRouter();

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
          p={10}
          w="100%"
          maxW={"md"}
          spacing={8}
          alignItems="center"
          bgColor={"white"}
          borderRadius="2xl"
          boxShadow="lg">
          <Link href="/">
            <Image
              width="120px"
              src="https://thumbs.dreamstime.com/b/letter-pixel-icon-logo-design-element-can-be-used-as-as-complement-to-96097118.jpg"
              alt="DoP logo"
            />
          </Link>
          <Heading as={"h1"} fontWeight="normal" size={"lg"}>
            Sign In
          </Heading>
          <FormControl w="100%">
            <FormLabel>Email</FormLabel>
            <Input w="100%" type={"email"} placeholder="john-doe@example.com" />
            <FormHelperText>We will never share your email</FormHelperText>
          </FormControl>
          <FormControl w="100%">
            <FormLabel>Password</FormLabel>
            <InputGroup w="100%">
              <Input
                w="100%"
                type={isPasswordShown ? "text" : "password"}
                placeholder="**************"
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setIsPasswordShown((isPasswordShown) => !isPasswordShown)
                  }>
                  {isPasswordShown ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormHelperText>
              Don{"'"}t share your password with anyone 🤫
            </FormHelperText>
          </FormControl>
          <Flex w="100%" justifyContent={"end"}>
            <Link href={"/forgotpassword"}>
              <A color="blue.400">Forgot your password?</A>
            </Link>
          </Flex>
          <Button w="100%" colorScheme={"teal"}>
            Sign In
          </Button>
          <Text>
            Not a user?{" "}
            <Link href="/signup">
              <A color="blue.400">Sign up</A>
            </Link>{" "}
          </Text>
        </VStack>
      )}
    </Flex>
  );
};

export default Signin;
