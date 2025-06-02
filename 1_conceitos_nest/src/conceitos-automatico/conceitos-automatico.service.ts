import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceitosAutomaticoService {
  getHome(): string {
    return 'Bem-vindo ao módulo Conceitos Automático! (ConceitosAutomaticoService)';
  }
}
