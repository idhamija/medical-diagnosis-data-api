import { Grid, TextField } from "@mui/material";

const DropdownInput = ({
  name,
  label,
  disabled,
  value,
  handleChange,
  options,
  optionLabels,
}) => {
  return (
    <Grid item xs={6} md={3}>
      <TextField
        name={name}
        label={label}
        disabled={disabled || false}
        select
        InputLabelProps={{ shrink: true }}
        SelectProps={{
          native: true,
        }}
        fullWidth
        value={value}
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <option key={index} value={optionLabels ? option.value : option}>
            {optionLabels ? option.label : option}
          </option>
        ))}
      </TextField>
    </Grid>
  );
};

export default DropdownInput;
