import type { NextFunction, Request, Response } from 'express';
import { settings } from '../settings';

function Header(req: Request, res: Response, next: NextFunction): void {
  res.header('Access-Control-Allow-Origin', settings.host.cors.origin);
  res.header('Access-Control-Allow-Methods', settings.host.cors.methods.join(','));
  res.header('Access-Control-Allow-Headers', settings.host.cors.allowedHeaders.join(','));
  next();
}

export { Header };
