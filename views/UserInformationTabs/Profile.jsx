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
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import updateProfile from "../../services/updateProfile";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setUser } from "../../redux/features/userSlice";

const defaultFormData = {
  email: "",
  username: "",
  password: "",
};

export default function Profile() {
  const user = useSelector((state) => state.userReducer.value);
  const [prevImageFile, setPrevImageFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [disabled, setIsDisabled] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);
  const dispatch = useDispatch();
  const fileInput = useRef(null);
  const router = useRouter();
  const toast = useToast();

  const handleFormDataChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = async (e) => {
    setPrevImageFile(imageFile);
    setImageFile(e.target.files[0]);
  };

  const handleUpload = () => {
    fileInput.current.click();
  };

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      updateInfo();
    }
  };

  const updateInfo = async () => {
    setIsDisabled(true);
    const { code, msg, data } = await updateProfile(
      user.id,
      formData.username,
      formData.email,
      formData.password,
      imageFile
    );

    if (code < 0) {
      setFormData(defaultFormData);
      setIsDisabled(false);
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
          Edit Username and Profile Picture
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
        <FormControl isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleFormDataChange}
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleFormDataChange}
            placeholder="UserName"
            _placeholder={{ color: "gray.500" }}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleFormDataChange}
            onKeyDown={handleKeyDown}
            placeholder="password"
            _placeholder={{ color: "gray.500" }}
          />
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
            colorScheme={"teal"}
            w="full"
            isDisabled={disabled}
            onClick={updateInfo}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
