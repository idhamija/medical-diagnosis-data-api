import {
  createTheme,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
} from "@mui/material";

const theme = createTheme();

const DisplayTable = ({ displayFields, data }) => {
  return (
    <ThemeProvider theme={theme}>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "91.5%",
          margin: "0 auto 2.5rem auto",
        }}
      >
        <Table
          size="small"
          sx={{
            minWidth: 650,
          }}
        >
          <TableHead>
            <TableRow>
              {displayFields.map((item, index) => (
                <TableCell
                  key={index}
                  sx={{ fontWeight: "bold" }}
                  align="center"
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {displayFields.map((displayField, index) => (
                  <TableCell key={index} align="center">
                    {row[displayField]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

export default DisplayTable;
