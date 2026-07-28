import { Request, Response, NextFunction } from "express";
import AppError from "./appError";
import badRequestError from "./badRequestError";


function handleErrors(
  erro: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error(erro);

  if (isSupabaseError(erro)) {
    new badRequestError(erro.message).EnviaResposta(res);
    return;
  }

  if (erro instanceof AppError) {
    erro.EnviaResposta(res);
    return;
  }

  new AppError().EnviaResposta(res);
}

function isSupabaseError(erro: unknown): erro is {
  message: string;
  code?: string;
  details?: string;
  hint?: string;
} {
  return (
    typeof erro === "object" &&
    erro !== null &&
    "message" in erro
  );
}

export default handleErrors;
