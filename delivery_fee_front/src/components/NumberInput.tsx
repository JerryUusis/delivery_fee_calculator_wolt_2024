import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { handleNumberInput } from "../../utils/library";
import OutlinedInput from "@mui/material/OutlinedInput";

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
  const setNumberType = (isFloatValue: boolean): {} => {
    if (isFloatValue) {
      return { min: 0, step: 0.01 };
    } else {
      return { min: 0 };
    }
  };

  return (
    <FormControl variant="outlined" required>
      <InputLabel htmlFor={`id-${dataTestId}`}>{label}</InputLabel>
      <OutlinedInput
        id={`id-${dataTestId}`}
        label={label}
        inputProps={{
          ...setNumberType(isFloatValue),
          "data-test-id": dataTestId,
        }}
        type="number"
        onChange={(e) =>
          handleNumberInput(e.target.value, setState, isFloatValue)
        }
      />
    </FormControl>
  );
};

export default NumberInput;
