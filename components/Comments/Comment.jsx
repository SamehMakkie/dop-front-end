import { Avatar, HStack, Text, VStack } from "@chakra-ui/react";

const Comment = ({ id, userId, gameId, avatar, username, comment }) => {
  return (
    <HStack w="100%" spacing={5} alignItems="start">
      <Avatar size={"sm"} name={username} src={avatar} />
      <VStack w="100%" spacing={3} alignItems="start">
        <Text fontWeight={"bold"}>{username}</Text>
        <Text maxW={"500px"} lineHeight="200%">{comment}</Text>
      </VStack>
    </HStack>
  );
};

export default Comment;
