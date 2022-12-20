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
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import pay from "../../services/pay";
import NavigationWrapper from "../../views/NavigationWrapper/NavigationWrapper";

// Define an array of months
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Define an array of years
const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: currentYear - 1900 + 1 },
  (_, i) => i + 1900
);

const Checkout = () => {
  const user = useSelector((state) => state.userReducer.value);
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
  });
  const [hasBeenPressed, setHasBeenPressed] = useState(false);
  const [days, setDays] = useState([]);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [total, setTotal] = useState();
  const toast = useToast();
  const router = useRouter();
  const query = router.query;
  const priceBeforeTax = Number(query.total_price);
  const priceAfterTax =
    priceBeforeTax + priceBeforeTax * (Number(query.tax_percentage) / 100);

  useEffect(() => {
    setTotal(147);
  }, []);

  const handlePurchase = async () => {
    setHasBeenPressed(true);

    if (
      formData.name != "" &&
      formData.cardNumber != "" &&
      day != "" &&
      month != "" &&
      year != ""
    ) {
      toast({
        title: "Processing",
        description: "Your payment is being processed please wait",
        status: "loading",
        position: "top-right",
        duration: 1900,
      });

      console.log("=======================");
      console.log(
        user.id +
          " " +
          query.game_id +
          " " +
          query.tax_percentage +
          " " +
          priceAfterTax +
          " " +
          formData.name
      );
      console.log("=======================");

      const { code, msg } = await pay(
        user.id,
        query.game_id,
        query.tax_percentage,
        priceAfterTax,
        formData.name
      );

      if (code >= 0) {
        toast({
          title: "Payment succeeded",
          description:
            "Your payment has been successfully completed, thank you for purchasing from us",
          status: "success",
          isClosable: true,
          position: "top-right",
        });

        await setTimeout(() => router.push("/library"), 3000);
      } else {
        toast({
          title: "Payment failed",
          description: msg,
          status: "error",
          position: "top-right",
        });
      }
    }
  };

  const handleFormDataChange = (e) => {
    setHasBeenPressed(false);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    // Update the options for the day Select component based on the selected month and year
    const updateDays = () => {
      // Get the number of days in the selected month
      let daysInMonth;
      if (month === 1) {
        // Check if the selected year is a leap year
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
          daysInMonth = 29;
        } else {
          daysInMonth = 28;
        }
      } else {
        daysInMonth = new Date(year, month + 1, 0).getDate();
      }

      // Generate an array of days (1 to daysInMonth)
      const updatedDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

      setDays(updatedDays);
    };

    updateDays();
  }, [month, year]);

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
            <FormControl
              isRequired
              isInvalid={hasBeenPressed && formData.name == ""}>
              <FormLabel>Name on card</FormLabel>
              <Input
                type="text"
                name={"name"}
                placeholder="John Doe"
                onChange={handleFormDataChange}
                value={formData.name}
              />
            </FormControl>
            <FormControl
              isRequired
              isInvalid={hasBeenPressed && formData.cardNumber == ""}>
              <FormLabel>Card number</FormLabel>
              <Input
                type="number"
                name={"cardNumber"}
                placeholder="xxxx-xxxx-xxxx-xxxx"
                onChange={handleFormDataChange}
                value={formData.cardNumber}
              />
            </FormControl>
            <Flex w="100%" justifyContent={"space-between"}>
              <FormControl
                isRequired
                pr={1}
                isInvalid={hasBeenPressed && day == ""}>
                <Select
                  onChange={(e) => setDay(e.target.value)}
                  placeholder="D">
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </Select>
                <FormHelperText pl={4}>Day</FormHelperText>
              </FormControl>
              <FormControl
                isRequired
                pr={1}
                isInvalid={hasBeenPressed && month == ""}>
                <Select
                  onChange={(e) => setMonth(months.indexOf(e.target.value))}
                  placeholder="M">
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </Select>
                <FormHelperText pl={4}>Month</FormHelperText>
              </FormControl>
              <FormControl isRequired isInvalid={hasBeenPressed && year == ""}>
                <Select
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="Y">
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Select>
                <FormHelperText pl={4}>Year</FormHelperText>
              </FormControl>
            </Flex>
            <Heading w="100%" fontSize={"lg"}>
              Tax: {query.tax_percentage}%
            </Heading>
            <Heading w="100%">
              Total: {priceAfterTax && "$"}
              {priceAfterTax}
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
