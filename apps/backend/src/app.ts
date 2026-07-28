import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import handleErrors from "./middlewares/Error/handleErrors";
import { notFoundHandler } from "./middlewares/Error/notFoundHandler";
import { routes } from "./routes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "API está rodando" });
});

app.use("/api", routes);
app.use(notFoundHandler.handle);
app.use(handleErrors);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
