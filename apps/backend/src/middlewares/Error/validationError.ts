import appError from "./appError";


class validationError extends appError{
  constructor(mensagem = "Erro de dados enviados") {
    super(mensagem,400)
  }
}

export default validationError
