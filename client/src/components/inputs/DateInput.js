import { Grid, TextField } from "@mui/material";

const DateInput = ({ name, label, value, handleChange }) => {
  return (
    <Grid item xs={6} md={3}>
      <TextField
        name={name}
        label={label}
        type="date"
        fullWidth
        InputLabelProps={{ shrink: true }}
        value={value}
        onChange={handleChange}
      />
    </Grid>
  );
};

export default DateInput;
