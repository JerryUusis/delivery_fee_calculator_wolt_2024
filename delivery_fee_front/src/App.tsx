import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en";
import dayjs, { Dayjs } from "dayjs";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NumberInput from "./components/NumberInput";
import AlertHandler from "./components/AlertHandler";
import React, { useState } from "react";
import {
  calculateItemsPrice,
  calculateDeliveryFee,
  calculateDistancePrice,
  calculateSmallCartSurcharge,
} from "../utils/library";
import DateTimeInput from "./components/DateTimeInput";
import { SeverityTypes, InputError } from "../utils/types";

function App() {
  const [cart, setCart] = useState<number>(0);
  const [items, setItems] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [isRushHour, setIsRushHour] = useState<boolean>(false);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [severity, setSeverity] = useState<SeverityTypes>("error");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [inputError, setInputError] = useState<InputError>({
    cartInput: false,
    itemInput: false,
    distanceInput: false,
  });

  // If input's value (or state) is 0 or less then display AlertHandler
  // Else calculate total of the states
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    checkInputErrors();

    if (Object.values(inputError).includes(true)) {
      handleAlert("Please enter missing value", "error");
    } else {
      const itemsPrice = calculateItemsPrice(items);
      const distancePrice = calculateDistancePrice(distance);
      const smallCartSurcharge = calculateSmallCartSurcharge(cart);
      const total = calculateDeliveryFee(
        cart,
        smallCartSurcharge,
        distancePrice,
        itemsPrice,
        isRushHour
      );
      setDeliveryFee(total);
    }
  };

  const handleAlert = (message: string, severity: SeverityTypes) => {
    setErrorMessage(message);
    setSeverity(severity);
    setIsVisible(true);
  };

  // If input's value is equal or less than 0, set the value to true
  // The output will be set to input's error prop
  const checkInputErrors = () => {
    const errors: InputError = {
      cartInput: cart <= 0,
      itemInput: items <= 0,
      distanceInput: distance <= 0,
    };
    setInputError(errors);
    return errors;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          width: "100vw",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <AlertHandler
          message={errorMessage}
          setIsVisible={setIsVisible}
          isVisible={isVisible}
          severity={severity}
        />
        <Typography variant="h4" component={"h1"}>
          Delivery fee calculator
        </Typography>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          component={"form"}
          onSubmit={handleSubmit}
        >
          <NumberInput
            label="Cart value (€)"
            setState={setCart}
            isFloatValue={true}
            dataTestId="cartValue"
            hasError={inputError.cartInput}
          />
          <NumberInput
            label="Number of items (pcs)"
            setState={setItems}
            isFloatValue={false}
            dataTestId="numberOfItems"
            hasError={inputError.itemInput}
          />
          <NumberInput
            label="Delivery Distance (m)"
            setState={setDistance}
            isFloatValue={false}
            dataTestId="deliveryDistance"
            hasError={inputError.distanceInput}
          />
          <DateTimeInput
            setIsRushHour={setIsRushHour}
            date={date}
            setDate={setDate}
          />
          <Button variant="contained" type="submit">
            Calculate delivery fee
          </Button>
        </Box>
        <Typography>
          Delivery fee: <span data-test-id="deliveryFee">{deliveryFee}</span>e
        </Typography>
      </Box>
    </LocalizationProvider>
  );
}

export default App;
