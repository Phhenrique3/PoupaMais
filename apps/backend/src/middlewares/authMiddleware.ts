import { NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret"


export interface AuthRequest extends Request{
   UserId ? : string
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("bearer")) {
    return res.status(401).json({ message: "token ausente" })
  }
  const token = header?.slice("Bearer".length)
  
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { sub?: string };
    if (!payload.sub) return res.status(401).json({ message: "token inválido" })
    
    req.UserId = payload.sub;
    return next()
  } catch {
    return res.status(401).json({message: "token inválido"})
  }
}
