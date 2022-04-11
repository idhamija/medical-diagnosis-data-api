import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import {
  errorHandlerMiddleware,
  queriesToLowercaseMiddleware,
} from "./middleware.js";
import router from "./routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", queriesToLowercaseMiddleware);

if (process.env.NODE_ENV === "production") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  app.use(express.static(resolve(__dirname, "client", "build")));

  app.use("/api", router);

  app.get("*", (req, res) => {
    res.sendFile(resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.use("/api", router);
}

app.use("/api", errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = () => {
  app.listen(port, () => console.log(`Server is listening on port ${port}...`));
};

start();
