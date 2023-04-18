import { NextFunction, Request, Response } from "express";
import environment from "../environment";

function Header(req: Request, res: Response, next: NextFunction): void {
  res.header("Access-Control-Allow-Origin", environment.host.cors.origin);
  res.header("Access-Control-Allow-Methods", environment.host.cors.methods.join(","));
  res.header("Access-Control-Allow-Headers", environment.host.cors.allowedHeaders.join(","));
  next();
}

export { Header };
