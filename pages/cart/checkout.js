import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import NavigationWrapper from "../../views/NavigationWrapper/NavigationWrapper";
import pay from "../../services/pay";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
const years = Array.from({ length: 10 }, (_, i) => i + currentYear);

const schema = yup.object({
  nameOnCard: yup.string().required("Name on card is required"),
  cardNumber1: yup
    .string()
    .required("Card number is required")
    .matches(/^[0-9]{4}$/, "Invalid card number"),
  cardNumber2: yup
    .string()
    .required("Card number is required")
    .matches(/^[0-9]{4}$/, "Invalid card number"),
  cardNumber3: yup
    .string()
    .required("Card number is required")
    .matches(/^[0-9]{4}$/, "Invalid card number"),
  cardNumber4: yup
    .string()
    .required("Card number is required")
    .matches(/^[0-9]{4}$/, "Invalid card number"),
});

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
  const inputCard1Ref = useRef(null);
  const inputCard2Ref = useRef(null);
  const inputCard3Ref = useRef(null);
  const inputCard4Ref = useRef(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const data = watch();
  const isBtnDisabled =
    !data.nameOnCard ||
    !data.cardNumber1 || data.cardNumber1.length != 4 ||
    !data.cardNumber2 || data.cardNumber2.length != 4 ||
    !data.cardNumber3 || data.cardNumber3.length != 4 ||
    !data.cardNumber4 || data.cardNumber4.length != 4 ||
    !day ||
    !month ||
    !year;

  const handleInputChange = (e, inputRef) => {
    if (e.target.value.length === 4) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    setTotal(147);
  }, []);

  const handlePurchase = async (data) => {
    setHasBeenPressed(true);
    const { nameOnCard, cardNumber1, cardNumber2, cardNumber3, cardNumber4 } =
      data;
    const fullCardNumber =
      cardNumber1 + cardNumber2 + cardNumber3 + cardNumber4;

    if (day != "" && month != "" && year != "") {
      toast({
        title: "Processing",
        description: "Your payment is being processed please wait",
        status: "loading",
        position: "top-right",
        duration: 1900,
      });

      const { code, msg } = await pay(
        user.id,
        query.game_id,
        query.tax_percentage,
        priceAfterTax,
        nameOnCard
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
        <FormControl
          w="100%"
          as="form"
          noValidate
          onSubmit={handleSubmit(handlePurchase)}>
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
              <FormControl isRequired isInvalid={Boolean(errors.nameOnCard)}>
                <FormLabel>Name on card</FormLabel>
                <Input
                  type="text"
                  placeholder="John Doe"
                  {...register("nameOnCard")}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Card number</FormLabel>
                <HStack>
                  <FormControl isInvalid={Boolean(errors.cardNumber1)}>
                    <Input
                      maxLength={4}
                      placeholder="XXXX"
                      ref={inputCard1Ref}
                      onChange={(e) => handleInputChange(e, inputCard2Ref)}
                      {...register("cardNumber1")}
                    />
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.cardNumber2)}>
                    <Input
                      maxLength={4}
                      placeholder="XXXX"
                      ref={inputCard2Ref}
                      onChange={(e) => handleInputChange(e, inputCard3Ref)}
                      {...register("cardNumber2")}
                    />
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.cardNumber3)}>
                    <Input
                      maxLength={4}
                      placeholder="XXXX"
                      ref={inputCard3Ref}
                      onChange={(e) => handleInputChange(e, inputCard4Ref)}
                      {...register("cardNumber3")}
                    />
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.cardNumber4)}>
                    <Input
                      maxLength={4}
                      ref={inputCard4Ref}
                      placeholder="XXXX"
                      {...register("cardNumber4")}
                    />
                  </FormControl>
                </HStack>
              </FormControl>
              <FormControl pb={0} isRequired>
                <FormLabel>Expiration Date</FormLabel>
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
                  <FormControl
                    isRequired
                    isInvalid={hasBeenPressed && year == ""}>
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
              </FormControl>

              <Heading w="100%" fontSize={"lg"}>
                Tax: {query.tax_percentage}%
              </Heading>
              <Heading w="100%">
                Total: {+parseFloat(priceAfterTax).toFixed(2) && "$"}
                {+parseFloat(priceAfterTax).toFixed(2)}
              </Heading>
              <Button
                w="100%"
                type="submit"
                colorScheme={"teal"}
                isDisabled={isBtnDisabled}>
                Buy
              </Button>
            </VStack>
          </Flex>
        </FormControl>
      </ProtectedRoute>
    </NavigationWrapper>
  );
};

export default Checkout;
