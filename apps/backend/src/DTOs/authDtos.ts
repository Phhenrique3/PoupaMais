export interface RegisterDTO{
  
  nome: string
  email: string
  password:string
}

export interface LoginDTO{
  email: string
  password:string
}

export interface AuthResponseDTO{
  token: string

}