import appError from "./AppError";

class badRequestError extends appError{
  constructor(mensagem =  "Requisição incorreta") {
    super(mensagem, 400)
  }
}

export default badRequestError