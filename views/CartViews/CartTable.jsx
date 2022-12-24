import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  Icon,
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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNumOfItems } from "../../redux/features/cartSlice";
import deleteCartItem from "../../services/deleteCartItem";

const CartTable = ({ list, total, setFetchAgain }) => {
  const user = useSelector((state) => state.userReducer.value);
  const numOfItemsInCart = useSelector((state) => state.cartReducer.value);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleDelete = async (gameId) => {
    const { code, msg } = await deleteCartItem(user.id, gameId);
    if (code >= 0) {
      setFetchAgain((prev) => !prev);
      dispatch(setNumOfItems(Number(numOfItemsInCart) - 1));
    } else {
      toast({
        title: "Error, could not delete",
        description: msg,
        status: "error",
        position: "top-right",
      });
    }
  };

  return (
    <TableContainer p={5} border="1px" rounded={"2xl"} borderColor="gray.200">
      <Table variant={"simple"}>
        <Thead>
          <Tr>
            {/* <Th>Image</Th> */}
            <Th>Name</Th>
            <Th>Price</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {list.map((game, i) => {
            return (
              <Tr key={i}>
                {/* <Td>
                  <Image
                  src={game.src}
                  alt={game.name}
                  height="150px"
                  width={"100px"}
                  minW={"100px"}
                  objectFit="cover"
                  rounded={"2xl"}
                  />
                </Td> */}
                <Td>{game.game_name}</Td>
                <Td>{+parseFloat(game.game_price).toFixed(2)}</Td>
                <Td>
                  <Button
                    onClick={() => {
                      handleDelete(game.game_ıd);
                    }}>
                    <Icon as={DeleteIcon} />{" "}
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th colSpan={1}>
              <Flex w="100%" justifyContent={"end"}>
                <Text fontSize={"lg"} fontWeight="normal">
                  Sum:{" "}
                </Text>
              </Flex>
            </Th>
            <Th colSpan={1}>
              <Heading fontSize={"lg"}>
                ${+parseFloat(total).toFixed(2)}
              </Heading>
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default CartTable;
