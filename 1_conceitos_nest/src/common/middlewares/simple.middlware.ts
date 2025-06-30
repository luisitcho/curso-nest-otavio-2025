import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `SimpleMiddleware: Request method: ${req.method}, URL: ${req.url}`,
    );
    const authorization = req.headers.authorization;

    if (authorization) {
      req['user'] = {
        nome: 'Luisitcho',
        sobrenome: 'API',
      };
    }

    if (!authorization) {
      throw new BadRequestException(
        'SimpleMiddleware: Authorization header is not allowed',
      );
    }

    res.setHeader('X-Header', 'Middleware Header Example');

    // Terminando a cadeia de chamadas
    // return res.status(404).send({
    //   message: 'Not Found',
    // });
    next(); // Chama o próximo middleware ou rota

    console.log('SimpleMiddleware: Request processing completed');

    res.on('finish', () => {
      console.log(`SimpleMiddleware: Finished`);
    });
  }
}
