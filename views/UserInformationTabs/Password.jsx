import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import changePassword from "../../services/changePassword";

export default function Password() {
  const user = useSelector((state) => state.userReducer.value);
  const [formData, setFormData] = useState({
    oldPass: "",
    pass: "",
    confirmPass: "",
  });
  const [btnClicked, setBtnClicked] = useState(false);
  const [arePasswordsDifferent, setArePasswordsDifferent] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleSave = async () => {
    setBtnClicked(true);
    if (formData.pass != formData.confirmPass) {
      setArePasswordsDifferent(true);
    } else {
      // change password
      const { code, msg } = await changePassword(
        user.id,
        formData.oldPass,
        formData.pass
      );

      if (code >= 0) {
        toast({
          title: "Password changed",
          description:
            "Your password has been successfully changed, redirecting to home page...",
          status: "success",
          position: "top-right",
          isClosable: true
        });

        router.push("/");
      } else {
        toast({
          title: "Error",
          description: msg,
          status: "error",
          position: "top-right",
          isClosable: true
        });
        setFormData({
          oldPass: "",
          pass: "",
          confirmPass: "",
        });
      }
    }
  };

  const handleChange = (e) => {
    setBtnClicked(false);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          Edit Password
        </Heading>

        <FormControl
          id="password"
          isRequired
          isInvalid={btnClicked && formData.oldPass == ""}>
          <FormLabel>Old Password</FormLabel>
          <Input
            name="oldPass"
            value={formData.oldPass}
            onChange={handleChange}
            placeholder="old password"
            _placeholder={{ color: "gray.500" }}
            type="password"
          />
        </FormControl>
        <FormControl
          id="password"
          isRequired
          isInvalid={
            (btnClicked && formData.confirmPass == "") ||
            (btnClicked && formData.pass != formData.confirmPass)
          }>
          <FormLabel>Password</FormLabel>
          <Input
            name="pass"
            value={formData.pass}
            onChange={handleChange}
            placeholder="password"
            _placeholder={{ color: "gray.500" }}
            type="password"
          />
          {arePasswordsDifferent && (
            <FormErrorMessage>Passwords do not match</FormErrorMessage>
          )}
        </FormControl>
        <FormControl
          id="password"
          isRequired
          isInvalid={
            (btnClicked && formData.confirmPass == "") ||
            (btnClicked && formData.pass != formData.confirmPass)
          }>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            name="confirmPass"
            value={formData.confirmPass}
            onChange={handleChange}
            placeholder="confirm password"
            _placeholder={{ color: "gray.500" }}
            type="password"
          />
          {arePasswordsDifferent && (
            <FormErrorMessage>Passwords do not match</FormErrorMessage>
          )}
        </FormControl>
        <Stack spacing={6} direction={["column", "row"]}>
          <Button w="full" onClick={() => router.push("/")}>
            Cancel
          </Button>
          <Button
            colorScheme={"teal"}
            w="full"
            onClick={handleSave}
            isDisabled={
              formData.oldPass == "" ||
              formData.pass == "" ||
              formData.confirmPass == ""
            }>
            Save
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
