import { Response } from "express";

class appError extends Error {
  public status: number;

  constructor(
    mensagem: string = "Erro Interno no servidor ",
    status: number = 500,
  ) {
    super(mensagem);
    this.name = "appError";
    this.status = status;
  }

  EnviaResposta(res: Response): void {
    res.status(this.status).send({
      mensagem: this.message,
      status: this.status,
    });
  }
}

export default appError;
