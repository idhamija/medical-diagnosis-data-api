import {
  Autocomplete,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { cols, genders, states } from "../Data.js";
import { generateParams, generateParamsString } from "../Utils";
import CopyAlert from "./CopyAlert";
import DateInput from "./inputs/DateInput";
import DropdownInput from "./inputs/DropdownInput";
import NumberInput from "./inputs/NumberInput";

const theme = createTheme();

const Form = ({ setDisplayFields, setResponse }) => {
  const initialQueries = {
    fromDate: "",
    toDate: "",
    minAge: 0,
    maxAge: 200,
    gender: "all",
    state: "all",
    testName: "all",
    sortBy: "none",
    sortOrder: "ascending",
    limit: 0,
    offset: 0,
  };

  const columnLabels = Object.keys(cols);

  const sortingcolumns = ["none", ...columnLabels.slice(1, -3)];

  const [tests, setTests] = useState([]);
  const [query, setQuery] = useState(initialQueries);
  const [fields, setFields] = useState(columnLabels);
  const [showAlert, setShowAlert] = useState(false);

  const urlRef = useRef("");

  // Fetch tests
  useEffect(() => {
    fetchTests();
    fetchUrl();
  }, []);

  // Alert Timeout
  useEffect(() => {
    let t;
    if (showAlert) {
      t = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }

    return () => {
      if (t) clearTimeout(t);
    };
  }, [showAlert]);

  const fetchTests = async () => {
    const { data } = await axios.get("/api/test/names");
    setTests(data);
  };

  const fetchUrl = async () => {
    const { data } = await axios.get("/api/baseurl");
    urlRef.current = data.url;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((prevQueries) => ({ ...prevQueries, [name]: value }));
  };

  const handleSubmit = async () => {
    setDisplayFields(fields);

    let columnQuery;
    if (fields.length !== columnLabels.length) {
      columnQuery = fields.map((field) => cols[field][0]).join(",");
    }

    const { data } = await axios.get("/api/sample", {
      params: { ...generateParams(query), columns: columnQuery },
    });
    setResponse(data);
  };

  const handleCopy = () => {
    let columnQuery;
    if (fields.length !== columnLabels.length) {
      columnQuery = fields.map((field) => cols[field][0]).join(",");
    }

    const params = generateParamsString(query, columnQuery);

    navigator.clipboard.writeText(urlRef.current + "/api/data" + params);

    setShowAlert(true);
  };

  const setFieldsModified = (e, newValue) => {
    if (e.target.textContent === "S.No.") {
      newValue.pop();
      newValue.unshift("S.No.");
    }

    setFields(newValue);
  };

  // const sortFields = (fields) =>
  //   fields.sort((a, b) => cols[a][1] - cols[b][1]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 4,
            marginBottom: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4">
            Medical Data API Generator
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={(e) => e.preventDefault()}
            sx={{ mt: 4 }}
          >
            {/* Filters */}
            <Grid container spacing={2}>
              {/* Minimum Age */}
              <NumberInput
                name="minAge"
                label="Minimum Age"
                value={query.minAge}
                handleChange={handleChange}
              />

              {/* Maximum Age */}
              <NumberInput
                name="maxAge"
                label="Maximum Age"
                value={query.maxAge}
                handleChange={handleChange}
              />

              {/* From Date */}
              <DateInput
                name="fromDate"
                label="From Date"
                value={query.fromDate}
                handleChange={handleChange}
              />

              {/* To Date */}
              <DateInput
                name="toDate"
                label="To Date"
                value={query.toDate}
                handleChange={handleChange}
              />

              {/* Gender */}
              <DropdownInput
                name="gender"
                label="Gender"
                value={query.gender}
                handleChange={handleChange}
                options={genders}
                optionLabels={true}
              />

              {/* State */}
              <DropdownInput
                name="state"
                label="State"
                value={query.state}
                handleChange={handleChange}
                options={states}
                optionLabels={false}
              />

              {/* Test */}
              <DropdownInput
                name="testName"
                label="Test Name"
                value={query.testName}
                handleChange={handleChange}
                options={tests}
                optionLabels={true}
              />

              {/* Limit */}
              <NumberInput
                name="limit"
                label="Limit"
                value={query.limit}
                handleChange={handleChange}
              />

              {/* Offset */}
              <NumberInput
                name="offset"
                label="Offset"
                value={query.offset}
                handleChange={handleChange}
              />

              {/* Sort By */}
              <DropdownInput
                name="sortBy"
                label="Sort By"
                value={query.sortBy}
                handleChange={handleChange}
                options={sortingcolumns}
                optionLabels={false}
              />

              {/* Sort Order */}
              <DropdownInput
                name="sortOrder"
                label="Sort Order"
                disabled={query.sortBy === "none"}
                value={query.sortOrder}
                handleChange={handleChange}
                options={["ascending", "descending"]}
                optionLabels={false}
              />

              {/* Reset Button */}
              <Grid
                container
                sx={{ alignItems: "center", justifyContent: "center" }}
                item
                xs={6}
                md={3}
              >
                <Button
                  size="large"
                  variant="outlined"
                  onClick={() => setQuery(initialQueries)}
                >
                  Reset Filters
                </Button>
              </Grid>
            </Grid>

            {/* Columns Selector */}
            <Stack>
              <Autocomplete
                sx={{ marginTop: "1.5rem" }}
                multiple
                options={columnLabels}
                getOptionLabel={(option) => option}
                defaultValue={columnLabels}
                onChange={setFieldsModified}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Columns"
                    placeholder="Select Columns"
                  />
                )}
              />
            </Stack>

            {/* Buttons */}
            <Box
              sx={{
                marginTop: 2.5,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* Fetch Button */}
              <Button
                sx={{
                  marginLeft: "auto",
                  marginRight: 2,
                }}
                variant="contained"
                disabled={
                  fields.length === 0 ||
                  (fields.length === 1 && fields[0] === "S.No.")
                }
                onClick={handleSubmit}
              >
                Fetch Sample Data
              </Button>

              {/* Copy URL Button */}
              <Button
                sx={{
                  marginLeft: 2,
                  marginRight: "auto",
                }}
                variant="contained"
                disabled={
                  fields.length === 0 ||
                  (fields.length === 1 && fields[0] === "S.No.")
                }
                onClick={handleCopy}
              >
                Copy API URL
              </Button>

              {/* Copy URL Alert */}
              {showAlert ? <CopyAlert /> : <></>}
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Form;
