import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Select,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import checkEmail from "../services/checkEmail";
import checkUsername from "../services/checkUsername";
import createAccount from "../services/createAccount";

// Define an array of months
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Define an array of years
const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: currentYear - 1900 + 1 },
  (_, i) => i + 1900
);

const Signup = () => {
  const [formInfo, setFormInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  });
  const [res, setRes] = useState({
    username: { code: undefined, msg: undefined },
    email: { code: undefined, msg: undefined },
    signup: { code: undefined, msg: undefined },
  });
  const [arePasswordsSame, setArePasswordsSame] = useState(true);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const user = useSelector((state) => state.userReducer.value);
  const dispatch = useDispatch();
  const toast = useToast()
  const router = useRouter();

  const handleInfoChange = (e) => {
    setFormInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignUp = async () => {
    const usernameRes = await checkUsername(formInfo.username);
    const emailRes = await checkEmail(formInfo.email);
    setRes({
      username: usernameRes,
      email: emailRes,
      signup: { code: undefined, msg: undefined },
    });

    
    const birthDate = "1990-01-01";
    if (formInfo.password == formInfo.confirmPass) {
      setArePasswordsSame(true);
      const user = {
        ...formInfo,
        birthDate: birthDate,
      };
      const createdUser = await createAccount(user);
      if (createdUser.code >= 0) {
        dispatch(setUser({id: createdUser.data.Id, email: createdUser.data.email, username: createdUser.data.user_name, picture: createdUser.data.picture}));
        router.push("/");
      } else {
        toast({title: "Error", description: createdUser.msg})
      }
    } else {
      setArePasswordsSame(false);
    }
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
          my={20}
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
            Register
          </Heading>
          <FormControl isRequired w="100%" isInvalid={res.username.code < 0}>
            <FormLabel>Username</FormLabel>
            <Input
              w="100%"
              type={"text"}
              name="username"
              value={formInfo.username}
              onChange={handleInfoChange}
              placeholder="yourusername"
            />
            {res.username.code < 0 && (
              <FormErrorMessage>{res.username.msg}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired w="100%" isInvalid={res.email.code < 0}>
            <FormLabel>Email</FormLabel>
            <Input
              w="100%"
              type={"email"}
              name="email"
              value={formInfo.email}
              onChange={handleInfoChange}
              placeholder="john-doe@example.com"
            />
            {res.email.code < 0 ? (
              <FormErrorMessage>{res.email.msg}</FormErrorMessage>
            ) : (
              <FormHelperText>We will never share your email</FormHelperText>
            )}
          </FormControl>
          <FormControl isRequired w="100%" isInvalid={!arePasswordsSame}>
            <FormLabel>Password</FormLabel>
            <InputGroup w="100%">
              <Input
                w="100%"
                type={isPasswordShown ? "text" : "password"}
                name="password"
                value={formInfo.password}
                onChange={handleInfoChange}
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
            {!arePasswordsSame ? (
              <FormErrorMessage>Passwords are not the same</FormErrorMessage>
            ) : (
              <FormHelperText>
                Don{"'"}t share your password with anyone 🤫
              </FormHelperText>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={!arePasswordsSame}>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup w="100%">
              <Input
                w="100%"
                type={isPasswordShown ? "text" : "password"}
                name="confirmPass"
                value={formInfo.confirmPass}
                onChange={handleInfoChange}
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
            {arePasswordsSame && (
              <FormHelperText>Sorry, Just to double check</FormHelperText>
            )}
          </FormControl>
          
          <Button w="100%" colorScheme={"teal"} onClick={handleSignUp}>
            Register
          </Button>
          <Text>
            Already have an account?{" "}
            <Link href="/signin" color="blue.400">
              Sign in
            </Link>
          </Text>
        </VStack>
      )}
    </Flex>
  );
};

export default Signup;
