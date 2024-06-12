import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "dayjs/locale/en";
import dayjs, { Dayjs } from "dayjs";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import {
  handleNumberInput,
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
        <Typography variant="h4">Delivery fee calculator</Typography>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          component={"form"}
          onSubmit={handleSubmit}
        >
          <TextField
            label="Cart value (€)"
            type="number"
            onChange={(e) => handleNumberInput(e.target.value, setCart, true)}
            inputProps={{ min: 0, step: 0.01 }}
            required
          />
          <TextField
            label="Items amount (pcs)"
            type="number"
            onChange={(e) => handleNumberInput(e.target.value, setItems, true)}
            inputProps={{ min: 0 }}
            required
          />
          <TextField
            label="Distance (m)"
            type="number"
            onChange={(e) =>
              handleNumberInput(e.target.value, setDistance, false)
            }
            inputProps={{ min: 0 }}
            required
          />
          <DateTimePicker
            minDate={dayjs()}
            value={date}
            label="Time"
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
