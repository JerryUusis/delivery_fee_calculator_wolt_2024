import { Dayjs } from "dayjs";
import { SetStateAction } from "react";

export const handleNumberInput = (
  inputValue: string,
  setState: React.Dispatch<SetStateAction<number>>,
  isFloat: boolean
) => {
  if (inputValue === "") {
    setState(0);
  } else {
    if (isFloat) {
      inputValue.replace(",", ".");
      const floatValue = parseFloat(inputValue).toFixed(2);
      setState(parseFloat(floatValue));
    } else {
      setState(parseInt(inputValue));
    }
  }
};

export const handleDateInput = (
  inputValue: Dayjs,
  setIsRushHour: React.Dispatch<SetStateAction<boolean>>,
  setDate: React.Dispatch<SetStateAction<Dayjs>>
) => {
    if (inputValue === null) {
        return
    }
    setDate(inputValue)
    const hour = inputValue.hour();
    const weekday = inputValue.format("ddd");

    // Check is rush hour
    if (weekday === "Fri" && (hour > 14 && hour < 20)) {
        setIsRushHour(true)
    }
    else {
        setIsRushHour(false)
    }
};
