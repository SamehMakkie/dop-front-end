import {
  Card,
  CardBody,
  Skeleton,
  SkeletonText,
  VStack,
} from "@chakra-ui/react";

const LoadingGameCard = () => {
  return (
    <Card maxW={"xs"} boxShadow="none">
      <CardBody px={0} borderColor={"transparent"}>
        <VStack spacing={3} alignItems="start">
          <Skeleton w="100%" h="442px" borderRadius={"2xl"} />
          <SkeletonText w="100%" noOfLines={2} spacing={3} />
        </VStack>
      </CardBody>
    </Card>
  );
};

export default LoadingGameCard;
