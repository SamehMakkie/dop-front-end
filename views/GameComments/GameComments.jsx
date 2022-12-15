import { Divider, Heading, VStack } from "@chakra-ui/react";
import Comment from "../../components/Comments/Comment";
import CommentEditor from "../../components/Comments/CommentEditor";

const comments = [
    {
        id: 1,
        avatar: "",
        username: "evegave",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscingelit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venian"
    },
    {
        id: 2,
        avatar: "",
        username: "fourkite",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscingelit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venian"
    },
    {
        id: 3,
        avatar: "",
        username: "recapfish",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscingelit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venian"
    },
]

const GameComments = ({ isPurchased }) => {
  return (
    <VStack w="100%" px={[8, 0]} spacing={6} alignItems="start">
      <Heading w="100%">Comments</Heading>
      <Divider />
      {isPurchased && <CommentEditor />}
      {
        comments.map(comment => <Comment key={comment.id} {...comment} /> )
      }
    </VStack>
  );
};

export default GameComments;
