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
import { useSelector } from "react-redux";
import changePassword from "../../services/changePassword";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    oldPass: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .max(255, "Password must be less than 255 characters long")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
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

export default function Password() {
  const user = useSelector((state) => state.userReducer.value);
  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const toast = useToast();
  const router = useRouter();

  const data = watch();
  const isSignUpDisabled = !data.oldPass || !data.password || !data.confirmPass;

  const handleSave = async (data) => {
    console.log(data);

    // change password
    const { code, msg } = await changePassword(
      user.id,
      data.oldPass,
      data.password
    );

    if (code >= 0) {
      toast({
        title: "Password changed",
        description:
          "Your password has been successfully changed, redirecting to home page...",
        status: "success",
        position: "top-right",
        isClosable: true,
      });

      router.push("/");
    } else {
      toast({
        title: "Error",
        description: msg,
        status: "error",
        position: "top-right",
        isClosable: true,
      });
      reset();
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
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
        onSubmit={handleSubmit(handleSave)}>
        <Stack spacing={4} w={"full"}>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            Edit Password
          </Heading>

          <FormControl isRequired isInvalid={Boolean(errors.oldPass)}>
            <FormLabel>Old Password</FormLabel>
            <Input
              type="password"
              {...register("oldPass")}
              placeholder="old password"
              _placeholder={{ color: "gray.500" }}
            />
            {Boolean(errors.oldPass) && (
              <FormErrorMessage>{errors.oldPass.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={Boolean(errors.password)}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="password"
              {...register("password")}
              _placeholder={{ color: "gray.500" }}
            />
            {Boolean(errors.password) && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={Boolean(errors.confirmPass)}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              {...register("confirmPass")}
              placeholder="confirm password"
              _placeholder={{ color: "gray.500" }}
            />
            {Boolean(errors.confirmPass) && (
              <FormErrorMessage>{errors.confirmPass.message}</FormErrorMessage>
            )}
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button w="full" onClick={() => router.push("/")}>
              Cancel
            </Button>
            <Button
              colorScheme={"teal"}
              w="full"
              type="submit"
              isDisabled={isSignUpDisabled}>
              Save
            </Button>
          </Stack>
        </Stack>
      </FormControl>
    </Flex>
  );
}
