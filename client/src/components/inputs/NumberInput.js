import { Grid, TextField } from "@mui/material";

const NumberInput = ({ name, label, value, handleChange }) => {
  return (
    <Grid item xs={6} md={3}>
      <TextField
        name={name}
        label={label}
        type="number"
        fullWidth
        InputLabelProps={{ shrink: true }}
        value={value}
        onChange={handleChange}
      />
    </Grid>
  );
};

export default NumberInput;
