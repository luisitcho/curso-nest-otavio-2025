import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

// CRUD
// Create -> POST -> Criar um recado
// Read -> GET -> Ler todos os recados
// Read -> GET -> Ler apenas um recado
// Update -> PATCH / PUT -> Atualizar um recado
// Delete -> DELETE -> Apagar um recado

// PATCH é utilizado para atualizar dados de um recurso
// PUT é utilizado para atualizar um recurso inteiro

// Definição dos campos esperados no corpo da requisição
interface CreateRecadoDto {
  titulo: string;
  descricao: string;
}

@Controller('recados')
export class RecadosController {
  // Encontrar todos os recados
  @HttpCode(HttpStatus.OK) // Define o código de status HTTP para 200 OK
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

  @Patch(':id') // /recados/:id
  update(@Param('id') id: string, @Body() body: CreateRecadoDto) {
    return {
      id,
      ...body,
    };
  }
}
