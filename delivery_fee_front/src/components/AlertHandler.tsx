import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
import { SeverityTypes } from "../../utils/types";
import { useEffect } from "react";

interface AlertHandlerProps {
  message: string;
  severity: SeverityTypes;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlertHandler = ({
  message,
  severity,
  setIsVisible,
  isVisible,
}: AlertHandlerProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [isVisible]);

  const handleClick = () => {
    setIsVisible(false);
  };

  return (
    <Fade in={isVisible}>
      <Alert
        severity={severity}
        onClick={handleClick}
        sx={{
          display: "sticky",
          position: "absolute",
          top: "50%",
          left: "50%",
          zIndex: 1500,
          transform: "translate(-50%, -50%)",
        }}
        variant="filled"
      >
        {message}
      </Alert>
    </Fade>
  );
};

export default AlertHandler;
