// const tests = [
//   { label: "all", value: "all" },
//   { label: "Diabetes", value: "diabetes" },
// ];

const genders = [
  { label: "all", value: "all" },
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const states = [
  "all",
  "Andaman and Nicobar",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const cols = {
  "S.No.": ["sn", 0],
  "Patient Age": ["pa", 1],
  "Patient Gender": ["pg", 2],
  "Patient Height": ["ph", 3],
  "Patient Weight": ["pw", 4],
  "Patient State": ["ps", 5],
  "Test Name": ["tn", 6],
  "Test Value": ["tv", 7],
  "Test Min": ["ti", 8],
  "Test Max": ["ta", 9],
  "Test Unit": ["tu", 10],
  "Test Date": ["td", 11],
  "Test Time": ["tt", 12],
  Severity: ["se", 13],
  Diagnosis: ["di", 14],
  Treatment: ["tr", 15],
};

export { cols, genders, states };