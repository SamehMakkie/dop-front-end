import {
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Stack,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { MdPhone, MdEmail, MdLocationOn, MdFacebook } from "react-icons/md";
import { AtSignIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import sendMessage from "../../services/sendMessage";
import { BsTwitter, BsInstagram, BsYoutube } from "react-icons/bs";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),
  subject: yup.string().required("Subject is required"),
  message: yup
    .string()
    .required("Message is required")
    .max(1000, "Message must be less than 1000 characters"),
});

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [charactersLeft, setCharactersLeft] = useState(1000);
  const toast = useToast();

  const handleMessageSending = async (data) => {
    const { email, subject, message } = data;
    const { code, msg } = await sendMessage(email, subject, message);

    if (code < 0) {
      toast({
        title: "Failed to send",
        description: msg,
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    } else {
      toast({
        title: "Message sent successfully",
        description:
          "Your message has been sent successfully, we will get back to you soon",
        status: "success",
        position: "top-right",
        isClosable: true,
      });
      reset();
    }
  };

  const data = watch();
  const messageValue = watch("message", "");
  const isBtnDisabled = !data.email || !data.subject || !data.message;

  useEffect(() => {
    setCharactersLeft(1000 - messageValue.length);
  }, [messageValue]);

  return (
    <Flex w={["100vw", "100%"]} mt={0} overflow="hidden">
      <Flex w="100%">
        <Box
          w="100%"
          bg="teal.400"
          color="white"
          borderRadius="2xl"
          m={{ base: 0, sm: 0, md: 5, lg: 10 }}
          p={{ base: 0, sm: 5, md: 5, lg: 10 }}>
          <FormControl
            w="100%"
            as={"form"}
            noValidate
            onSubmit={handleSubmit(handleMessageSending)}>
            <Stack
              w="100%"
              spacing={[10, 5, 5]}
              pb={[5, 0]}
              direction={["column", "column", "row"]}>
              <Box w="100%" p={4}>
                <Heading color={"white"}>Contact</Heading>
                <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.100">
                  Fill up the form below to contact
                </Text>
                <Flex
                  py={{ base: 5, sm: 5, md: 8, lg: 10 }}
                  w="100%"
                  justifyContent={"center"}>
                  <VStack pl={0} spacing={10} alignItems="flex-start">
                    <HStack>
                      <MdPhone size="20px" />
                      <a href={`tel:+90533XXXXXXX`}>
                        <Text>+90 533 XXX XXXX</Text>
                      </a>
                    </HStack>
                    <HStack>
                      <MdEmail size="20px" />
                      <a href={`mailto:john-doe@mail.com`}>
                        <Text>john-doe@mail.com</Text>
                      </a>
                    </HStack>
                    <HStack>
                      <MdLocationOn size="20px" />
                      <a href={`geo:35.1424050,33.9117501`}>
                        <Text>Magusa, TRNC</Text>
                      </a>
                    </HStack>
                  </VStack>
                </Flex>
                <HStack
                  mt={{ lg: 10, md: 10 }}
                  spacing={5}
                  px={5}
                  alignItems="flex-start">
                  <IconButton
                    aria-label="facebook"
                    variant="ghost"
                    size="lg"
                    isRound={true}
                    _hover={{ bg: "teal.500" }}
                    icon={<BsTwitter size="28px" />}
                  />
                  <IconButton
                    aria-label="github"
                    variant="ghost"
                    size="lg"
                    isRound={true}
                    _hover={{ bg: "teal.500" }}
                    icon={<BsInstagram size="28px" />}
                  />
                  <IconButton
                    aria-label="discord"
                    variant="ghost"
                    size="lg"
                    isRound={true}
                    _hover={{ bg: "teal.500" }}
                    icon={<BsYoutube size="28px" />}
                  />
                </HStack>
              </Box>

              <Flex w="100%" px={[4, 0]}>
                <Box w={"100%"} bg="white" borderRadius="2xl">
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <FormControl isInvalid={Boolean(errors.email)}>
                        <FormLabel>Email</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement pointerEvents="none">
                            <AtSignIcon color="gray.800" />
                          </InputLeftElement>
                          <Input
                            type="text"
                            size="md"
                            {...register("email")}
                            _focus={{ borderColor: "teal.400" }}
                          />
                        </InputGroup>
                        {Boolean(errors.email) && (
                          <FormErrorMessage>
                            {errors.email?.message}
                          </FormErrorMessage>
                        )}
                      </FormControl>
                      <FormControl isInvalid={Boolean(errors.subject)}>
                        <FormLabel>Subject</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <Input
                            type="text"
                            size="md"
                            {...register("subject")}
                            _focus={{ borderColor: "teal.400" }}
                          />
                        </InputGroup>
                        {Boolean(errors.subject) && (
                          <FormErrorMessage>
                            {errors.subject?.message}
                          </FormErrorMessage>
                        )}
                      </FormControl>
                      <FormControl isInvalid={Boolean(errors.message)}>
                        <Flex
                          w="100%"
                          justifyContent={"space-between"}
                          alignItems="center">
                          <FormLabel>Message</FormLabel>
                          <Text color={"gray.500"} fontSize="xs">
                            {charactersLeft}
                          </Text>
                        </Flex>
                        <Textarea
                          placeholder="message"
                          borderColor="gray.300"
                          {...register("message")}
                          _hover={{
                            borderRadius: "gray.300",
                          }}
                          _focus={{ borderColor: "teal.400" }}
                        />
                        {Boolean(errors.message) && (
                          <FormErrorMessage>
                            {errors.message?.message}
                          </FormErrorMessage>
                        )}
                      </FormControl>
                      <FormControl id="name" float="right">
                        <Button
                          type="submit"
                          variant="solid"
                          colorScheme={"teal"}
                          isDisabled={isBtnDisabled}>
                          Send Message
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
              </Flex>
            </Stack>
          </FormControl>
        </Box>
      </Flex>
    </Flex>
  );
}
