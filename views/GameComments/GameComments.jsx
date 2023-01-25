import {
  Alert,
  AlertIcon,
  Divider,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Comment from "../../components/Comments/Comment";
import CommentEditor from "../../components/Comments/CommentEditor";

// const comments = [
//     {
//         id: 1,
//         avatar: "",
//         username: "evegave",
//         comment: "Lorem ipsum dolor sit amet, consectetur adipiscingelit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venian"
//     },
//     {
//         id: 2,
//         avatar: "",
//         username: "fourkite",
//         comment: "Lorem ipsum dolor sit amet, consectetur adipiscingelit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venian"
//     },
//     {
//         id: 3,
//         avatar: "",
//         username: "recapfish",
//         comment: "Lorem ipsum dolor sit amet, consectetur adipiscingelit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venian"
//     },
// ]

const GameComments = ({ gameId, comments, isPurchased, setRefresh }) => {
  return (
    <VStack w="100%" px={[8, 0]} spacing={6} alignItems="start">
      <Heading w="100%">Comments</Heading>
      <Divider />
      {isPurchased ? (
        <CommentEditor gameId={gameId} setRefresh={setRefresh} />
      ) : (
        <Alert status="info">
          <AlertIcon />
          You can{"'"}t comment before buying the game
        </Alert>
      )}
      {!comments || (Array.isArray(comments) && comments.length === 0) ? (
        <Alert status="info">
          <AlertIcon />
          No comments has been posted yet
        </Alert>
      ) : (
        comments.map((comment) => (
          <Comment
            key={comment.comment_id}
            id={comment.comment_id}
            userId={comment.user_id}
            username={comment.user_name}
            avatar={comment.user_picture}
            gameId={comment.game_id}
            comment={comment.comment}
          />
        ))
      )}
    </VStack>
  );
};

export default GameComments;
