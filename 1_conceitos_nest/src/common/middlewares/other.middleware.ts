import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class OtherMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `OtherMiddleware: Request method: ${req.method}, URL: ${req.url}`,
    );
    const authorization = req.headers.authorization;

    if (authorization) {
      req['user'] = {
        nome: 'Luisitcho',
        sobrenome: 'API',
      };
    }

    res.setHeader('X-Header', 'Middleware Header Example');

    // Terminando a cadeia de chamadas
    // return res.status(404).send({
    //   message: 'Not Found',
    // });
    next(); // Chama o próximo middleware ou rota

    console.log('OtherMiddleware: Request processing completed');
  }
}
