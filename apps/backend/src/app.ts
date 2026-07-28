import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { routes } from "./routes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "API está rodando" });
});

app.use("/api", routes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
