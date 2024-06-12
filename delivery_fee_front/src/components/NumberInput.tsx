import TextField from "@mui/material/TextField";
import { handleNumberInput } from "../../utils/library";

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
    <TextField
      label={label}
      type="number"
      onChange={(e) =>
        handleNumberInput(e.target.value, setState, isFloatValue)
      }
      inputProps={{
        ...setNumberType(isFloatValue),
        "data-test-id": dataTestId,
      }}
      required
    />
  );
};

export default NumberInput;
