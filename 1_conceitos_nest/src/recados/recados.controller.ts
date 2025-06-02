import { Body, Controller, Get, Param, Post } from '@nestjs/common';

// Definição dos campos esperados no corpo da requisição
interface CreateRecadoDto {
  titulo: string;
  descricao: string;
}

@Controller('recados')
export class RecadosController {
  // Encontrar todos os recados
  @Get() // /recados
  findAll() {
    return 'Essa rota retorna todos os recados';
  }

  // Encontrar um recado específico
  @Get(':id') // /recados/:id
  findOne(@Param('id') id: string) {
    return `Essa rota retorna um recado específico com o ID: ${id}`;
  }

  // Criar um novo recado
  @Post() // /recados
  create(@Body() body: CreateRecadoDto) {
    return body;
  }
}
