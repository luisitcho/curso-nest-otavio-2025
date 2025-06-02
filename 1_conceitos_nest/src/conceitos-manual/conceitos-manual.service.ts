import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceitosManualService {
  solutionHome(): string {
    return 'Bem-vindo ao módulo Conceitos Manual! (ConceitosManualService)';
  }
}
