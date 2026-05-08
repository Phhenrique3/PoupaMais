// apps/backend/src/app.ts
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { routes } from "./routes";
import { authRoutes } from "./routes/authRoutes";
import handleErrors from "./middlewares/Error/handleErrors";
import { notFoundHandler } from "./middlewares/Error/notFoundHandler"
dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use("/api/auth", authRoutes); 
app.use(handleErrors);
app.use(notFoundHandler.handle)

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
