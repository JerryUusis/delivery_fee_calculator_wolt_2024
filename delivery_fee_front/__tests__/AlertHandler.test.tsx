import { cleanup, screen, render } from "@testing-library/react";
import AlertHandler from "../src/components/AlertHandler";
import { user } from "./testHelper";

describe("<AlertHandler />", () => {
  const setIsVisibleMock = vi.fn();
  const alertHandler = (
    <AlertHandler
      message="test message"
      severity="error"
      setIsVisible={setIsVisibleMock}
      isVisible={true}
    />
  );
  beforeEach(() => {
    render(alertHandler);
  });
  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });
  test("should render", () => {
    const alert = screen.getByText("test message");
    expect(alert).toBeInTheDocument();
  });
  test("should have right background colour with severity 'alert'", () => {
    const alert = screen.getByText("test message");
    expect(alert).toHaveStyle("backgroundColor: 211, 47, 47");
  });
  test("should turn disappaer with click", async () => {
    const alert = screen.getByText("test message");
    await user.click(alert);
    expect(setIsVisibleMock).toHaveBeenCalledTimes(1);
    expect(setIsVisibleMock).toHaveBeenCalledWith(false);
  });
});
