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
  Link,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import login from "../services/login";

const Signin = () => {
  const user = useSelector((state) => state.userReducer.value);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isBtnPressed, setIsBtnPressed] = useState(false);
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const toast = useToast();

  const handleSignIn = async () => {
    setIsBtnPressed(true);
    const email = formData.email;
    const password = formData.password;

    if (email != "" && password != "") {
      const res = await login(email, password);
      if (res.code >= 0) {
        dispatch(
          setUser({
            id: res.data.Id,
            email: res.data.email,
            username: res.data.user_name,
            picture: "http://msevince.com/Dop/" + res.data.picture,
          })
        );
        router.push("/");
      } else {
        toast({
          title: "Error",
          description:
            "Could not find a user with the given email and/or password",
          status: "error",
          position: "top-right",
        });
      }
    }
  };

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      handleSignIn();
    }
  };
  const handleInputsChange = (e) => {
    setIsBtnPressed(false);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
          p={10}
          w="100%"
          maxW={"md"}
          spacing={8}
          alignItems="center"
          bgColor={"white"}
          borderRadius="2xl"
          boxShadow="lg">
          <Link href="/">
            <Image width="120px" src="/DoPa128.png" alt="DoP logo" />
          </Link>
          <Heading as={"h1"} fontWeight="normal" size={"lg"}>
            Sign In
          </Heading>
          <FormControl
            w="100%"
            isRequired
            isInvalid={isBtnPressed && formData.email == ""}>
            <FormLabel>Email</FormLabel>
            <Input
              w="100%"
              type={"email"}
              name="email"
              onChange={handleInputsChange}
              value={formData.email}
              placeholder="john-doe@example.com"
            />
            <FormHelperText>We will never share your email</FormHelperText>
          </FormControl>
          <FormControl
            w="100%"
            isRequired
            isInvalid={isBtnPressed && formData.password == ""}>
            <FormLabel>Password</FormLabel>
            <InputGroup w="100%">
              <Input
                w="100%"
                name="password"
                value={formData.password}
                onChange={handleInputsChange}
                onKeyDown={handleEnter}
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
            <Link href={"/password/reset"} color="blue.400">
              Forgot your password?
            </Link>
          </Flex>
          <Button
            w="100%"
            colorScheme={"teal"}
            onClick={handleSignIn}
            isDisabled={formData.email == "" || formData.password == ""}>
            Sign In
          </Button>
          <Text>
            Not a user?{" "}
            <Link href="/signup" color="blue.400">
              Register
            </Link>
          </Text>
        </VStack>
      )}
    </Flex>
  );
};

export default Signin;
