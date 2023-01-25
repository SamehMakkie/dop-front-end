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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters long")
      .max(255, "Username must be less than 255 characters long")
      .matches(
        /^[a-zA-Z0-9_]*$/,
        "Username can only contain alphanumeric characters and underscores"
      ),
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter a valid email address"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .max(255, "Password must be less than 255 characters long")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPass: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords do not match")
      .required("Confirm password is required"),
  })
  .required();

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const user = useSelector((state) => state.userReducer.value);
  const dispatch = useDispatch();
  const toast = useToast();
  const router = useRouter();

  const data = watch();
  const isSignUpDisabled =
    !data.username || !data.email || !data.password || !data.confirmPass;

  const handleSignUp = async () => {
    const { username, email, password } = data;
    const usernameRes = await checkUsername(username);

    if (usernameRes.code < 0) {
      toast({
        title: "Username is not available",
        description: "The Username is already in use, try another username",
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    }

    const emailRes = await checkEmail(email);

    if (emailRes.code < 0) {
      toast({
        title: "Email is not available",
        description: "The Email is already in use",
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    }

    if (usernameRes.code >= 0 && emailRes.code >= 0) {
      // password or birth_date
      const birthDate = "1990-01-01";
      const user = {
        email,
        username: username,
        password,
        birthDate: birthDate,
      };
      const createdUser = await createAccount(user);
      if (createdUser.code >= 0) {
        dispatch(
          setUser({
            id: createdUser.data.Id,
            email: createdUser.data.email,
            username: createdUser.data.user_name,
            picture: createdUser.data.picture,
          })
        );
        router.push("/");
      } else {
        toast({
          title: "Error",
          description: createdUser.msg,
          status: "error",
          position: "top-right",
          isClosable: true,
        });
      }
    }
  };

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      handleSubmit(handleSignUp)
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
        <FormControl
          as={"form"}
          noValidate
          p={10}
          w="100%"
          my={20}
          maxW={"md"}
          alignItems="center"
          bgColor={"white"}
          borderRadius="2xl"
          boxShadow="lg"
          onSubmit={handleSubmit(handleSignUp)}>
          <VStack w="100%" spacing={8}>
            <Link href="/">
              <Image width="120px" src="/DoPa128.png" alt="DoP logo" />
            </Link>
            <Heading as={"h1"} fontWeight="normal" size={"lg"}>
              Register
            </Heading>
            <FormControl
              isRequired
              w="100%"
              isInvalid={Boolean(errors.username)}>
              <FormLabel>Username</FormLabel>
              <Input
                w="100%"
                type="text"
                onKeyDown={handleEnter}
                placeholder="yourusername"
                {...register("username")}
              />
              {Boolean(errors.username) && (
                <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired w="100%" isInvalid={Boolean(errors.email)}>
              <FormLabel>Email</FormLabel>
              <Input
                w="100%"
                type="email"
                onKeyDown={handleEnter}
                placeholder="john-doe@example.com"
                {...register("email")}
              />
              {Boolean(errors.email) ? (
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              ) : (
                <FormHelperText>We will never share your email</FormHelperText>
              )}
            </FormControl>
            <FormControl
              isRequired
              w="100%"
              isInvalid={Boolean(errors.password)}>
              <FormLabel>Password</FormLabel>
              <InputGroup w="100%">
                <Input
                  w="100%"
                  onKeyDown={handleEnter}
                  type={isPasswordShown ? "text" : "password"}
                  placeholder="**************"
                  {...register("password")}
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
              {Boolean(errors.password) ? (
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              ) : (
                <FormHelperText>
                  Don{"'"}t share your password with anyone 🤫
                </FormHelperText>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={Boolean(errors.confirmPass)}>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup w="100%">
                <Input
                  w="100%"
                  onKeyDown={handleEnter}
                  type={isPasswordShown ? "text" : "password"}
                  placeholder="**************"
                  {...register("confirmPass")}
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
              {Boolean(errors.confirmPass) ? (
                <FormErrorMessage>
                  {errors.confirmPass?.message}
                </FormErrorMessage>
              ) : (
                <FormHelperText>Sorry, Just to double check</FormHelperText>
              )}
            </FormControl>

            <Button
              w="100%"
              type="submit"
              colorScheme={"teal"}
              isDisabled={isSignUpDisabled}>
              Register
            </Button>
            <Text>
              Already have an account?{" "}
              <Link href="/signin" color="blue.400">
                Sign in
              </Link>
            </Text>
          </VStack>
        </FormControl>
      )}
    </Flex>
  );
};

export default Signup;
