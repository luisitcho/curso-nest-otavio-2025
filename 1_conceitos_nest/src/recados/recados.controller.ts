import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RecadosService } from './recados.service';

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
  de: string;
  para: string;
}

interface PaginatinonQuery {
  limit?: number; // Limite de recados a serem retornados
  offset?: number; // Posição inicial para a busca de recados
}

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}
  // Encontrar todos os recados
  @HttpCode(HttpStatus.OK) // Define o código de status HTTP para 200 OK
  @Get() // /recados
  findAll(@Query() pagination: PaginatinonQuery) {
    // const { limit = 10, offset = 0 } = pagination;
    // return `Essa rota retorna todos os recados com limite de ${limit} e offset de ${offset}`;
    return this.recadosService.findAll();
  }

  // Encontrar um recado específico
  @Get(':id') // /recados/:id
  findOne(@Param('id') id: string) {
    return this.recadosService.findOne(id);
  }

  // Criar um novo recado
  @Post() // /recados
  create(@Body() body: CreateRecadoDto) {
    const novoRecado = {
      titulo: body.titulo,
      descricao: body.descricao,
      texto: body.descricao,
      de: body.de,
      para: body.para,
      lido: false,
      data: new Date(),
    };
    return this.recadosService.create(novoRecado);
  }

  @Patch(':id') // /recados/:id
  update(@Param('id') id: string, @Body() body: CreateRecadoDto) {
    return this.recadosService.update(id, body);
  }

  @Delete(':id') // /recados/:id
  remove(@Param('id') id: string) {
    return this.recadosService.remove(id);
    // return `Recado com ID ${id} foi removido com sucesso`;
  }
}
