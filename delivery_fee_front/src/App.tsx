import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "dayjs/locale/de";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function App() {
  const currentDate = dayjs();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField label="Cart value"></TextField>
          <TextField label="Distance"></TextField>
          <DateTimePicker minDate={currentDate} label="Time" />
        </Box>
        <Button variant="contained">Calculate delivery fee</Button>
        <Typography>Delivery price will be here</Typography>
      </Box>
    </LocalizationProvider>
  );
}

export default App;
