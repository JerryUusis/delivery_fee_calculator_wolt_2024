import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { handleDateInput } from "../../utils/library";

interface DateTimeProps {
  setIsRushHour: React.Dispatch<React.SetStateAction<boolean>>;
  setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  date: Dayjs;
}

const DateTimeInput = ({ setIsRushHour, setDate, date }: DateTimeProps) => {
  return (
    <DateTimePicker
      minDate={dayjs()}
      value={date}
      label="Order time"
      ampm={false}
      format="DD.MM.YYYY HH:mm"
      onChange={(newValue) =>
        handleDateInput(newValue as Dayjs, setIsRushHour, setDate)
      }
      slotProps={{
        textField: { inputProps: { "data-test-id": "orderTime" } },
      }}
    />
  );
};

export default DateTimeInput;
