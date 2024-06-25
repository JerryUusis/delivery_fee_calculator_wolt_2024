import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { handleNumberInput } from "../../utils/library";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useState } from "react";

interface TextFieldProps {
  label: string;
  setState: React.Dispatch<React.SetStateAction<number>>;
  isFloatValue: boolean;
  dataTestId: string;
}

const NumberInput = ({
  label,
  setState,
  isFloatValue,
  dataTestId,
}: TextFieldProps) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const setNumberType = (isFloatValue: boolean): {} => {
    if (isFloatValue) {
      return { min: 0, step: 0.01 };
    } else {
      return { min: 0 };
    }
  };
  // Prevent from inserting separators in the integer inputs
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let invalidCharacters = "-e";
    if (!isFloatValue) {
      invalidCharacters += ".,";
    }
    if (invalidCharacters.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleNumberInput(e.target.value, setState, isFloatValue);
    if (e.target.value === "0" || "") {
      setHasError(true);
    } else {
      setHasError(false);
    }
  };

  return (
    <FormControl variant="outlined" error={hasError}>
      <InputLabel htmlFor={`id-${dataTestId}`}>{label}</InputLabel>
      <OutlinedInput
        id={`id-${dataTestId}`}
        label={label}
        inputProps={{
          ...setNumberType(isFloatValue),
          "data-test-id": dataTestId,
        }}
        type="number"
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
    </FormControl>
  );
};

export default NumberInput;
