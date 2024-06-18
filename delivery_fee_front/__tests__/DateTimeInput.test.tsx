import { cleanup, render, screen } from "@testing-library/react";
import DateTimeInput from "../src/components/DateTimeInput";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en";
import { user } from "./testHelper";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

describe.only("<DateTimeInput />", () => {
  const setDateMock = vi.fn();
  const setIsRushHourMock = vi.fn();
  const testDate = dayjs("1990-01-03T00:00:00");
  const dateTimeInput = (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en"}>
      <DateTimeInput
        setIsRushHour={setIsRushHourMock}
        setDate={setDateMock}
        date={testDate}
      />
    </LocalizationProvider>
  );
  beforeEach(() => {
    render(dateTimeInput);
  });
  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });
  test("the testing environment's timezone should be set to UTC", () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    expect(timeZone).toBe("UTC");
  });
  test("should render with the correct date", () => {
    const dateTimeInput = screen.getByLabelText("Order time");
    const expectedDateValue = testDate.format("DD.MM.YYYY HH:mm");
    expect(dateTimeInput).toBeInTheDocument();
    expect(dateTimeInput).toHaveValue(expectedDateValue);
  });
  test("should set new date when typed", async () => {
    const dateTimeInput = screen.getByLabelText("Order time");
    // Type the date in without empty spaces or colons
    const newDate = "100119901200";
    await user.type(dateTimeInput, newDate);

    const expectedNewDate = "10.01.1990 12:00";
    expect(dateTimeInput).toHaveValue(expectedNewDate);
  });
  test("should call the setDate with the correct date", async () => {
    const dateTimeInput = screen.getByLabelText("Order time");
    const newDate = "100119901200";
    await user.type(dateTimeInput, newDate);

    const expectedNewDate = dayjs("1990-01-10T12:00:00"); 
    expect(setDateMock).toHaveBeenLastCalledWith(expectedNewDate);
    expect(dateTimeInput).toHaveValue("10.01.1990 12:00")
  });
});
