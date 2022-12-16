import {
  Flex,
  Heading,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const CartTable = ({ list, total }) => {
  return (
    <TableContainer p={5} border="1px" rounded={"2xl"} borderColor="gray.200">
      <Table variant={"simple"}>
        <Thead>
          <Tr>
            <Th>Image</Th>
            <Th>Name</Th>
            <Th>Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {list.map((game, i) => {
            return (
              <Tr key={i}>
                <Td>
                  <Image
                    src={game.src}
                    alt={game.name}
                    height="150px"
                    width={"100px"}
                    objectFit="cover"
                    rounded={"2xl"}
                  />
                </Td>
                <Td>{game.name}</Td>
                <Td>{game.price}</Td>
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th colSpan={2}>
              <Flex w="100%" justifyContent={"end"}>
                <Text fontSize={"lg"}>Sum: </Text>
              </Flex>
            </Th>
            <Th colSpan={1}>
              <Heading>${total}</Heading>
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default CartTable;
