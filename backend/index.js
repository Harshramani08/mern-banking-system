import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import UserRouter from "./routers/user.route.js";
import TransactionRouter from "./routers/transaction.route.js";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.get("/", (req, res) => {
  res.send("Backend Running....");
});
app.use("/api/auth", UserRouter);
app.use("/api/data", TransactionRouter);

app.listen(port, () => {
  console.log(`Backend started http://localhost:${port}`);
});
