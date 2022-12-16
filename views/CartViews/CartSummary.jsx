import {
  Button,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const CartSummary = ({ sum, tax }) => {
  const total = Number(sum) + Number(tax);
  const router = useRouter();

  return (
    <VStack
      w="100%"
      maxW={"300px"}
      p={5}
      spacing={3}
      borderWidth="1px"
      borderColor={"gray.400"}
      rounded="2xl">
      <Heading>Summary</Heading>
      <TableContainer w="100%">
        <Table>
          <Tbody>
            <Tr>
              <Td>Sum</Td>
              <Td>${sum}</Td>
            </Tr>
            <Tr>
              <Td>Tax</Td>
              <Td>${tax}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Text>
        Total:{" "}
        <Heading as={"span"} display={"inline"} fontSize="lg">
          ${total}
        </Heading>
      </Text>
      <Button
        w="100%"
        colorScheme={"teal"}
        onClick={() => {
          router.push("/cart/checkout");
        }}>
        Checkout
      </Button>
    </VStack>
  );
};

export default CartSummary;
