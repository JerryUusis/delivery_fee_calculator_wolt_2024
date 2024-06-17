import { cleanup, render, screen } from "@testing-library/react";
import { user } from "./testHelper";
import NumberInput from "../src/components/NumberInput";

describe("<NumberInput />", () => {
  afterEach(() => {
    cleanup();
  });
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
      vi.resetAllMocks();
    });

    test("should render", () => {
      const input = screen.getByRole("spinbutton");
      expect(input).toBeInTheDocument();
    });
    test("should accept input value", async () => {
      const input = screen.getByRole("spinbutton");
      await user.type(input, "1.11");
      expect(input).toHaveValue(1.11);
    });
    test("should call setState", async () => {
      const input = screen.getByRole("spinbutton");
      await user.type(input, "1.11");
      // when input value is 1. it will return ""
      expect(setStateMock).toHaveBeenCalledTimes(3);
      expect(setStateMock).toHaveBeenLastCalledWith(1.11);
    });
    test("empty input should have value of null", () => {
      const input = screen.getByRole("spinbutton");
      expect(input).toHaveValue(null);
    });
    test("should return 10 when value is 10,", async () => {
      const input = screen.getByRole("spinbutton");
      await user.type(input, "10,");
      expect(input).toHaveValue(10);
    });
    test("should return 10 when value is 10.", async () => {
      const input = screen.getByRole("spinbutton");
      await user.type(input, "10.");
      expect(input).toHaveValue(10);
    });
    test("should have right label text", () => {
      const label = screen.getByText("test label");
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent("test label");
    });
    test("input should have correct value for 'data-test-id' attribute", () => {
      const input = screen.getByRole("spinbutton");
      expect(input).toHaveAttribute("data-test-id", "test-id");
    });
  });
});
