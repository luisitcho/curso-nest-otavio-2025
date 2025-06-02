import { Controller, Get } from '@nestjs/common';

@Controller('recados')
export class RecadosController {
  // Encontrar todos os recados
  @Get() // /recados
  findAll() {
    return 'Essa rota retorna todos os recados';
  }

  // Encontrar um recado específico
  @Get(':id') // /recados/:id
  findOne() {
    return 'Essa rota retorna um recado específico';
  }
}
