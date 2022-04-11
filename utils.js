import dotenv from "dotenv";
import mysql from "mysql2";
import { cols } from "./data.js";
dotenv.config();

const buildSelectStatement = (columns) => {
  let selectStatement;
  if (columns) {
    selectStatement = columns
      .split(",")
      .reduce((prev, curr) => prev + cols[curr][0] + cols[curr][1], "SELECT ");
  } else {
    selectStatement = Object.values(cols).reduce(
      (prev, curr) => prev + curr[0] + curr[1],
      "SELECT "
    );
  }

  return selectStatement.slice(0, -2) + "\n";
};

const buildWhereStatement = (requestQuery) => {
  const { fromdate, todate, minage, maxage, gender, state, testname } =
    requestQuery;

  let condition = "";

  if (fromdate) {
    const [year, month, day] = fromdate.split("-");
    condition += `dd.day>=${day} AND dd.month>=${month} AND dd.year>=${year} AND `;
  }

  if (todate) {
    const [year, month, day] = todate.split("-");
    condition += `dd.day<=${day} AND dd.month<=${month} AND dd.year<=${year} AND `;
  }

  if (minage) {
    condition += `ftr.patient_age>=${minage} AND `;
  }

  if (maxage) {
    condition += `ftr.patient_age<=${maxage} AND `;
  }

  if (gender) {
    condition += `dpa.gender="${gender}" AND `;
  }

  if (state) {
    const stateModified = state.replace(/\+/g, " ");
    condition += `dpa.state="${stateModified}" AND `;
  }

  if (testname) {
    condition += `dtt.test_name="${testname}" AND `;
  }

  return (
    condition && "WHERE " + condition.slice(0, condition.length - 5) + "\n"
  );
};

const getSqlQuery = (requestQuery, isSample) => {
  const { limit, offset, columns, sortby, sortorder } = requestQuery;

  if (columns && columns.length === 2 && columns === "sn") {
    const error = new Error();
    error.name = "serialOnlyError";
    error.message = "Select atleast one more column apart from S.No.";
    throw error;
  }

  const selectStatement = buildSelectStatement(columns);
  const fromStatement =
    "FROM fact_test_report AS ftr LEFT JOIN dim_test_type AS dtt USING(test_type_id) LEFT JOIN dim_patient AS dpa USING(patient_id) LEFT JOIN dim_prescription AS dpr USING(prescription_id) LEFT JOIN dim_time AS dt USING(time_id) LEFT JOIN dim_date AS dd ON dd.date_id=ftr.date_id\n";
  const whereStatement = buildWhereStatement(requestQuery);
  const orderStatement =
    sortby && sortby !== "sn"
      ? `ORDER BY ${cols[sortby][0]}${sortorder ? sortorder : ""}\n`
      : "";
  const limitStatement = isSample
    ? "LIMIT 10"
    : `LIMIT ${limit ? limit : "18446744073709551615"} OFFSET ${
        offset ? offset : 0
      }`;

  return (
    selectStatement +
    fromStatement +
    whereStatement +
    orderStatement +
    limitStatement +
    (!columns || columns.slice(0, 2) === "sn"
      ? ") a, (SELECT @row_num:=0) y;"
      : ";")
  );
};

const capitalize = (str) => {
  let words = str.split(" ");
  words = words.map((word) => word[0].toUpperCase() + word.slice(1));
  return words.join(" ");
};

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DB,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

export { capitalize, connection, getSqlQuery };
