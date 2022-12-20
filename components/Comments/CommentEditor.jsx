import {
  Avatar,
  Button,
  HStack,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import postComment from "../../services/postComment";

const CommentEditor = ({ gameId, setRefresh }) => {
  const user = useSelector((state) => state.userReducer.value);
  const textAreaRef = useRef();
  const toast = useToast();

  const handlePostComment = async () => {
    // API POST Request
    if (user) {
      const { code, msg } = await postComment(
        user.id,
        gameId,
        textAreaRef.current.value
      );
      if (code >= 0) {
        setRefresh();
        toast({
          title: "Comment posted",
          description: "Your comment has been posted successfully.",
          status: "success",
          isClosable: true,
          position: "top-right",
        });
      }
    }
    // Clear Textarea
    textAreaRef.current.value = "";
    toast({
      title: "Comment posted",
      description: "Your comment has been successfully posted.",
      duration: 1500,
      isClosable: true,
      status: "success",
      position: "top-right",
    });
  };

  return (
    <HStack w="100%" spacing={5} alignItems="start">
      <Avatar size={"sm"} />
      <VStack w="100%" spacing={3} alignItems="start">
        <Text fontWeight={"bold"}>{user.username}</Text>
        <Textarea
          ref={textAreaRef}
          maxW={"500px"}
          placeholder="Here goes your comment"
          resize={"vertical"}
        />
        <Button colorScheme={"teal"} onClick={handlePostComment}>
          Post
        </Button>
      </VStack>
    </HStack>
  );
};

export default CommentEditor;
