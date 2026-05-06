import appError from "./AppError";


class validationError extends appError{
  constructor(mensagem = "Erro de dados enviados") {
    super(mensagem,400)
  }
}

export default validationError