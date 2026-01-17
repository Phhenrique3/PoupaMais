// apps/backend/src/app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { routes } from "./routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.send("API está rodando ✨");
});

// 🔑 AQUI você conecta TODAS as rotas do sistema
app.use("/api", routes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
