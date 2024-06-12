import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberInput from "../src/components/NumberInput";

describe.only("<NumberInput />", () => {
  describe("is floating point value input", () => {
    const setStateMock = vi.fn();
    const floatInput = (
      <NumberInput
        label="test label"
        setState={setStateMock}
        isFloatValue={true}
        dataTestId="test-id"
      />
    );
    beforeEach(() => {
      render(floatInput);
    });
    afterEach(() => {
      cleanup();
    });
    test("should render", () => {
      const input = screen.getByRole("spinbutton");
      expect(input).toBeInTheDocument();
    });
    test("should accept input value", async () => {
      const input = screen.getByRole("spinbutton");
      const user = userEvent.setup();
      await user.type(input, "1.11");
      expect(input).toHaveValue(1.11);
    });
  });
});
