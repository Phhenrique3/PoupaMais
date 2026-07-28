import { NextFunction, Request, Response } from "express";
import appError from "./appError";

export class notFoundHandler {
  static handle(req: Request, res: Response, next: NextFunction) {
    return next(new appError(`Rota ${req.originalUrl} não encotrado`, 404));
  }
}
