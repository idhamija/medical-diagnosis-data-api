const cols = {
  sn: ["(@row_num:=@row_num+1) AS 'S.No.', a.* FROM (SELECT ", ""],
  pa: ["ftr.patient_age ", "AS 'Patient Age', "],
  pg: ["dpa.gender ", "AS 'Patient Gender', "],
  ph: ["dpa.height ", "AS 'Patient Height', "],
  pw: ["dpa.weight ", "AS 'Patient Weight', "],
  ps: ["dpa.state ", "AS 'Patient State', "],
  tn: ["dtt.test_name ", "AS 'Test Name', "],
  tv: ["ftr.test_value ", "AS 'Test Value', "],
  ti: ["dtt.min_value ", "AS 'Test Min', "],
  ta: ["dtt.max_value ", "AS 'Test Max', "],
  tu: ["dtt.unit ", "AS 'Test Unit', "],
  td: [
    "CONCAT(dd.year,'-',LPAD(dd.month,2,0),'-',LPAD(dd.day,2,0)) ",
    "AS 'Test Date', ",
  ],
  tt: [
    "CONCAT(LPAD(dt.hour,2,0),':',LPAD(dt.minute,2,0)) ",
    "AS 'Test Time', ",
  ],
  se: ["ftr.severity ", "AS 'Severity', "],
  di: ["dpr.diagnosis ", "AS 'Diagnosis', "],
  tr: ["dpr.treatment ", "AS 'Treatment', "],
};

export { cols };
