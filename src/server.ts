import express from "express";
import router from "./router";
import cors from "cors";
import morgan from "morgan";
import { signup, signin, protect } from "./modules/auth";
import { handleInputErrors, validateInputs } from "./modules/middleware";

const app = express();

const operationalErrorHandler = (err, req, res, next) => {  
  if (err.isOperational) {
    res.status(err.httpCode).json({ error: err });
  } else next(err);
};

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.use("/signup", [validateInputs("signup"), handleInputErrors], signup);
app.use("/signin", [validateInputs("signin"), handleInputErrors], signin);
app.use("/api", protect, router);
app.use(operationalErrorHandler);

export default app;
