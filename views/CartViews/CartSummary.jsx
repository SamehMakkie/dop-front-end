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

const CartSummary = ({gameIds, sum, tax }) => {
  const total = Number(sum) + Number(sum) * (Number(tax) / 100);
  console.log(gameIds);
  const router = useRouter();


  let hrefGameIds = ""
  for (let i = 0; i < gameIds.length; ++i) {
    hrefGameIds += gameIds[i] + "#"
  }
  
  const query = {
    game_id: hrefGameIds,
    tax_percentage: tax,
    total_price: +parseFloat(sum).toFixed(2),
  } 
  
  console.log("=================");
  console.log(query);
  console.log("=================");

  const handleBtnPressed = () => {
    
    router.push({pathname: "/cart/checkout", query});
  }

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
              <Td>${+parseFloat(sum).toFixed(2)}</Td>
            </Tr>
            <Tr>
              <Td>Tax</Td>
              <Td>%{+parseFloat(tax).toFixed(2)}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Text>
        Total:{" "}
        <Heading as={"span"} display={"inline"} fontSize="lg">
          ${+parseFloat(total).toFixed(2)}
        </Heading>
      </Text>
      <Button
        w="100%"
        colorScheme={"teal"}
        onClick={handleBtnPressed}>
        Checkout
      </Button>
    </VStack>
  );
};

export default CartSummary;
