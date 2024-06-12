import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "dayjs/locale/en";
import dayjs, { Dayjs } from "dayjs";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NumberInput from "./components/NumberInput";
import React, { useState } from "react";
import {
  handleDateInput,
  calculateItemsPrice,
  calculateDeliveryFee,
  calculateDistancePrice,
  calculateSmallCartSurcharge,
} from "../utils/library";

function App() {
  const [cart, setCart] = useState<number>(0);
  const [items, setItems] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [isRushHour, setIsRushHour] = useState<boolean>(false);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
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
        <Typography variant="h4" component={"h1"}>Delivery fee calculator</Typography>
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
          />
          <NumberInput
          label="Number of items (pcs)"
          setState={setItems}
          isFloatValue={false}
          dataTestId="numberOfItems"
          />
          <NumberInput 
          label="Delivery Distance (m)"
          setState={setDistance}
          isFloatValue={false}
          dataTestId="deliveryDistance"
          />
          <DateTimePicker
            minDate={dayjs()}
            value={date}
            label="Order time"
            ampm={false}
            format="DD.MM.YYYY HH:mm"
            onChange={(newValue) =>
              handleDateInput(newValue as Dayjs, setIsRushHour, setDate)
            }
          />
          <Button variant="contained" type="submit">
            Calculate delivery fee
          </Button>
        </Box>
        <Typography>Delivery fee: {deliveryFee}e</Typography>
      </Box>
    </LocalizationProvider>
  );
}

export default App;
