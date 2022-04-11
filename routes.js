import { Router } from "express";
import { capitalize, connection, getSqlQuery } from "./utils.js";

const router = Router();

router.get("/sample", (req, res) => {
  connection.connect((error) => {
    if (error) {
      res.status(500).json({
        success: false,
        message: "Encountered an error while connecting to database.",
      });
      return;
    }

    const sqlQuery = getSqlQuery(req.query, true);

    connection.query(sqlQuery, async (error, data) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: "Encountered an error while quering to database.",
        });
        return;
      }

      const json = await JSON.parse(JSON.stringify(data));
      res.status(200).json({ success: true, data: json });

      // const url =
      //   req.protocol +
      //   "://" +
      //   req.headers.host +
      //   req.originalUrl.replace("sample", "data");
      // res.status(200).json({ success: true, data: json, url });
    });
  });
});

router.get("/data", (req, res) => {
  connection.connect((error) => {
    if (error) {
      res.status(500).json({
        message: "Encountered an error while connecting to database.",
      });
      return;
    }

    const sqlQuery = getSqlQuery(req.query, false);

    connection.query(sqlQuery, async (error, data) => {
      if (error) {
        res.status(500).json({
          message: "Encountered an error while quering to database.",
        });
        return;
      }

      const json = await JSON.parse(JSON.stringify(data));
      res.status(200).json(json);
    });
  });
});

router.get("/test/names", (req, res) => {
  connection.connect((error) => {
    if (error) {
      res.status(500).json({
        message: "Encountered an error while connecting to database.",
      });
      return;
    }

    const sqlQuery = "SELECT test_name AS value from dim_test_type";

    connection.query(sqlQuery, async (error, data) => {
      if (error) {
        res.status(500).json({
          message: "Encountered an error while quering to database.",
        });
        return;
      }

      let json = await JSON.parse(JSON.stringify(data));
      json = json.map((item) => ({ label: capitalize(item.value), ...item }));
      json = [{ label: "all", value: "all" }, ...json];

      res.status(200).json(json);
    });
  });
});

router.get("/baseurl", (req, res) => {
  const url = req.protocol + "://" + req.headers.host;

  res.status(200).json({ url });
});

export default router;
