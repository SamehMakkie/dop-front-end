import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import updateProfile from "../../services/updateProfile";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setUser } from "../../redux/features/userSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

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
  })
  .required();

export default function Profile() {
  const user = useSelector((state) => state.userReducer.value);
  const [prevImageFile, setPrevImageFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const defaultValues = {
    email: user.email,
    username: user.username,
    password: "",
  };
  const {
    reset,
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const fileInput = useRef(null);
  const router = useRouter();
  const toast = useToast();

  const watchData = watch();
  const isUpdateDisabled =
    !watchData.username || !watchData.email || !watchData.password;

  const handleFileChange = async (e) => {
    setPrevImageFile(imageFile);
    setImageFile(e.target.files[0]);
  };

  const handleUpload = () => {
    fileInput.current.click();
  };

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      updateInfo(watchData);
    }
  };

  const getImageFileFromURL = async (url) => {
    const splitURL = url.split("/");
    const fileName = splitURL[splitURL.length - 1];
    // Make a request to the URL
    const response = await fetch(url, { mode: "no-cors" });

    // Retrieve the response as a Blob
    const blob = await response.blob();

    // Create a file object using the Blob and the file name
    const file = new File([blob], fileName, {
      type: blob.type,
    });

    return file;
  };

  const updateInfo = async (validatedData) => {
    console.log(validatedData);

    let picture = imageFile;

    if (!imageFile) {
      picture = await getImageFileFromURL(user.picture);
    }

    const { code, msg, data } = await updateProfile(
      user.id,
      validatedData.username,
      validatedData.email,
      validatedData.password,
      picture
    );

    if (code < 0) {
      setValue(defaultFormData);

      toast({
        title: "Profile Update failed",
        description: msg,
        position: "top-right",
        status: "error",
        duration: 10000,
        isClosable: true,
      });
    } else {
      dispatch(
        setUser({
          id: data.Id,
          email: data.email,
          username: data.user_name,
          picture: "http://194.27.78.83/dop/" + data.picture,
        })
      );
      toast({
        title: "Profile Updated",
        description:
          "Your profile has been successfully updated, redirecting to home page",
        position: "top-right",
        status: "success",
        duration: 10000,
        isClosable: true,
      });
      router.push("/");
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <FormControl
        as={"form"}
        noValidate
        p={6}
        w="100%"
        my={12}
        maxW={"md"}
        alignItems="center"
        bgColor={"white"}
        borderRadius="2xl"
        boxShadow="lg"
        onSubmit={handleSubmit(updateInfo)}>
        <Stack spacing={4} w={"full"}>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            Edit Profile
          </Heading>
          <FormControl>
            <FormLabel>User Icon</FormLabel>
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                {imageFile ? (
                  <Avatar size="xl" src={URL.createObjectURL(imageFile)} />
                ) : prevImageFile ? (
                  <Avatar size="xl" src={URL.createObjectURL(prevImageFile)} />
                ) : (
                  <Avatar size="xl" src={user.picture} />
                )}
              </Center>
              <Center w="full">
                <Input
                  ref={fileInput}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  display="none"
                />
                <Button w="full" onClick={handleUpload}>
                  {imageFile ? "Change Avatar" : "Upload Avatar"}
                </Button>
              </Center>
            </Stack>
          </FormControl>
          <FormControl isRequired isInvalid={Boolean(errors.email)}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              {...register("email")}
              onKeyDown={handleKeyDown}
              placeholder="john-doe@example.com"
              _placeholder={{ color: "gray.500" }}
            />
            {Boolean(errors.email) && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={Boolean(errors.username)}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="UserName"
              {...register("username")}
              onKeyDown={handleKeyDown}
              _placeholder={{ color: "gray.500" }}
            />
            {Boolean(errors.username) && (
              <FormErrorMessage>{errors.username.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isRequired isInvalid={Boolean(errors.password)}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              {...register("password")}
              onKeyDown={handleKeyDown}
              placeholder="password"
              _placeholder={{ color: "gray.500" }}
            />
            {Boolean(errors.password) && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              w="full"
              onClick={() => {
                router.push("/");
              }}>
              Cancel
            </Button>
            <Button
              w="full"
              type="submit"
              colorScheme={"teal"}
              isDisabled={isUpdateDisabled}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </FormControl>
    </Flex>
  );
}
