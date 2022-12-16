import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import NavigationWrapper from "../../views/NavigationWrapper/NavigationWrapper";

const Checkout = () => {
  const currentYear = new Date().getFullYear();
  const [total, setTotal] = useState();
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    setTotal(147);
  }, []);

  const handlePurchase = async () => {
    toast({
      title: "Processing",
      description: "Your payment is being processed please wait",
      status: "loading",
      position: "top-right",
      duration: 1900,
    });
    await setTimeout(
      () =>
        toast({
          title: "Payment succeeded",
          description:
            "Your payment has been successfully completed, thank you for purchasing from us",
          status: "success",
          isClosable: true,
          position: "top-right",
        }),
      2000
    );
    await setTimeout(() => router.push("/library"), 3000);
  };

  return (
    <NavigationWrapper>
      <ProtectedRoute>
        <Flex w="100%" py={20} justifyContent="center" alignItems={"center"}>
          <VStack
            w="100%"
            p={6}
            spacing={5}
            maxW="400px"
            borderWidth={"1px"}
            borderColor="gray.300"
            rounded="2xl">
            <Heading w="100%">Payment form</Heading>
            <FormControl>
              <FormLabel>Name on card</FormLabel>
              <Input type="text" placeholder="John Doe" />
            </FormControl>
            <FormControl>
              <FormLabel>Card number</FormLabel>
              <Input type="number" placeholder="xxxx-xxxx-xxxx-xxxx" />
            </FormControl>

            <Flex w="100%" justifyContent={"space-between"}>
              <FormControl pr={1}>
                <Select placeholder="D">
                  {[...Array(31)].map((e, i) => (
                    <option key={i}>{i + 1}</option>
                  ))}
                </Select>
                <FormHelperText pl={4}>Day</FormHelperText>
              </FormControl>
              <FormControl pr={1}>
                <Select placeholder="M">
                  {[...Array(12)].map((e, i) => (
                    <option key={i}>{i + 1}</option>
                  ))}
                </Select>
                <FormHelperText pl={4}>Month</FormHelperText>
              </FormControl>
              <FormControl>
                <Select placeholder="Y">
                  {[...Array(101)].map((e, i) => (
                    <option key={i}>{currentYear - i}</option>
                  ))}
                </Select>
                <FormHelperText pl={4}>Year</FormHelperText>
              </FormControl>
            </Flex>
            <Heading>
              Total: {total && "$"}
              {total}
            </Heading>
            <Button w="100%" colorScheme={"teal"} onClick={handlePurchase}>
              Buy
            </Button>
          </VStack>
        </Flex>
      </ProtectedRoute>
    </NavigationWrapper>
  );
};

export default Checkout;
