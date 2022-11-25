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
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";

const Signup = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <Flex
      w="100%"
      minH="100vh"
      justifyContent={"center"}
      alignItems="center"
      bgColor={"gray.50"}>
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
          <Image
            width="120px"
            src="https://thumbs.dreamstime.com/b/letter-pixel-icon-logo-design-element-can-be-used-as-as-complement-to-96097118.jpg"
            alt="DoP logo"
          />
        </Link>
        <Heading as={"h1"} fontWeight="normal" size={"lg"}>
          Sign Up
        </Heading>
        <FormControl w="100%">
          <FormLabel>Username</FormLabel>
          <Input w="100%" type={"text"} placeholder="yourusername" />
        </FormControl>
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
        <FormControl>
          <FormLabel>Confirm Password</FormLabel>
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
          <FormHelperText>Sorry, Just to double check</FormHelperText>
        </FormControl>
        <VStack w="100%" alignItems={"start"}>
          <FormLabel>Date of birth</FormLabel>
          <Flex w="100%" justifyContent={"space-between"}>
            <FormControl pr={1}>
              <Select placeholder="D">
                {[...Array(31)].map((e, i) => (
                  <option key={i}>{i + 1}</option>
                ))}
              </Select>
              <FormHelperText pl={4}>Day</FormHelperText>
            </FormControl>
            <FormControl pr={1}>
              <Select placeholder="M">
                {[...Array(12)].map((e, i) => (
                  <option key={i}>{i + 1}</option>
                ))}
              </Select>
              <FormHelperText pl={4}>Month</FormHelperText>
            </FormControl>
            <FormControl>
              <Select placeholder="Y">
                {[...Array(101)].map((e, i) => (
                  <option key={i}>{currentYear - i}</option>
                ))}
              </Select>
              <FormHelperText pl={4}>Year</FormHelperText>
            </FormControl>
          </Flex>
        </VStack>
        <Button w="100%" colorScheme={"teal"}>
          Sign Up
        </Button>
        <Text>
          Already have an account?{" "}
          <Link href="signin">
            <A color="blue.400">Sign in</A>
          </Link>{" "}
        </Text>
      </VStack>
    </Flex>
  );
};

export default Signup;
