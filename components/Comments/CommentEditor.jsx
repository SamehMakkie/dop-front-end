import {
  Avatar,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import postComment from "../../services/postComment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  comment: yup
    .string()
    .required("Message is required")
    .max(1000, "Message must be less than 1000 characters"),
});

const CommentEditor = ({ gameId, setRefresh }) => {
  const user = useSelector((state) => state.userReducer.value);
  const [charactersLeft, setCharactersLeft] = useState(1000);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const toast = useToast();
  const commentValue = watch("comment", "");

  const handlePostComment = async (data) => {
    const { comment } = data;
    // API POST Request
    if (user) {
      const { code, msg } = await postComment(user.id, gameId, comment);
      if (code < 0) {
        toast({
          title: "Failed to post",
          description: msg,
          status: "error",
          position: "top-right",
          isClosable: true,
        });
      } else {
        setRefresh();
        toast({
          title: "Comment posted",
          description: "Your comment has been posted successfully.",
          status: "success",
          isClosable: true,
          position: "top-right",
        });
      }
      reset();
    }
  };

  useEffect(() => {
    setCharactersLeft(1000 - commentValue.length);
  }, [commentValue]);

  return (
    <HStack w="100%" spacing={5} alignItems="start">
      <Avatar size={"sm"} />
      <FormControl
        as="form"
        w="100%"
        noValidate
        isInvalid={Boolean(errors.comment)}
        onSubmit={handleSubmit(handlePostComment)}>
        <VStack w="100%" spacing={3} alignItems="start">
          <Flex w="100%" maxW={"500px"} justifyContent={"space-between"} alignItems="center">
            <Text fontWeight={"bold"}>{user.username}</Text>
            <Text color={"gray.500"} fontSize="xs">
              {charactersLeft}
            </Text>
          </Flex>
          <Textarea
            maxW={"500px"}
            resize={"vertical"}
            {...register("comment")}
            placeholder="Here goes your comment"
          />
          {Boolean(errors.comment) && (
            <FormErrorMessage>{errors.comment?.message}</FormErrorMessage>
          )}
          <Button type="submit" colorScheme={"teal"} isDisabled={!commentValue}>
            Post
          </Button>
        </VStack>
      </FormControl>
    </HStack>
  );
};

export default CommentEditor;
