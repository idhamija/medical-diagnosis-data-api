import { cols } from "./Data";

const generateParams = (queries) => {
  const {
    fromDate,
    toDate,
    minAge,
    maxAge,
    gender,
    state,
    testName,
    sortBy,
    sortOrder,
    limit,
    offset,
  } = queries;

  let params = {};

  if (fromDate) {
    params = { ...params, fromDate };
  }

  if (toDate) {
    params = { ...params, toDate };
  }

  if (typeof minAge === "string") {
    params = { ...params, minAge };
  }

  if (typeof maxAge === "string") {
    params = { ...params, maxAge };
  }

  if (gender !== "all") {
    params = { ...params, gender };
  }

  if (state !== "all") {
    const stateModified = state.replaceAll(" ", "+").toLowerCase();
    params = { ...params, state: stateModified };
  }

  if (testName !== "all") {
    params = { ...params, testName };
  }

  if (sortBy !== "none") {
    const sortingCol = cols[sortBy][0];
    params = { ...params, sortBy: sortingCol };

    if (sortOrder === "descending") {
      params = {
        ...params,
        sortOrder: "desc",
      };
    }
  }

  if (limit > 0) {
    params = { ...params, limit };
  }

  if (offset > 0) {
    params = { ...params, offset };
  }

  return params;
};

const generateParamsString = (queries, columnQuery) => {
  const paramsObject = generateParams(queries);

  let paramString = "?";
  paramString = Object.keys(paramsObject).reduce(
    (prev, curr) => prev + curr + "=" + paramsObject[curr] + "&",
    paramString
  );
  if (columnQuery) {
    paramString += "columns=" + columnQuery + "&";
  }

  return paramString.slice(0, -1).toLowerCase();
};

export { generateParams, generateParamsString };
