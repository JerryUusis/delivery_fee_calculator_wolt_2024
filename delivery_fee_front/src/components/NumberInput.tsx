import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { handleNumberInput } from "../../utils/library";
import OutlinedInput from "@mui/material/OutlinedInput";

interface TextFieldProps {
  label: string;
  setState: React.Dispatch<React.SetStateAction<number>>;
  isFloatValue: boolean;
  dataTestId: string;
  hasError: boolean;
}

const NumberInput = ({
  label,
  setState,
  isFloatValue,
  dataTestId,
  hasError,
}: TextFieldProps) => {
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
