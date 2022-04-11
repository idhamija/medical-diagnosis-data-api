import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { Alert } from "@mui/material";

const CopyAlert = () => {
  return (
    <Alert
      severity="error"
      iconMapping={{
        error: <CheckCircleOutlinedIcon fontSize="inherit" />,
      }}
      sx={{ position: "fixed", bottom: "2.5%", right: "2.5%" }}
    >
      API URL Copied to Clipboard!
    </Alert>
  );
};

export default CopyAlert;
