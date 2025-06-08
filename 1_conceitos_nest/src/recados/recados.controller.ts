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
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';

// CRUD
// Create -> POST -> Criar um recado
// Read -> GET -> Ler todos os recados
// Read -> GET -> Ler apenas um recado
// Update -> PATCH / PUT -> Atualizar um recado
// Delete -> DELETE -> Apagar um recado

// PATCH é utilizado para atualizar dados de um recurso
// PUT é utilizado para atualizar um recurso inteiro

// DTO - Data Transfer Object -> Objeto de transferência de dados
// DTO -> Objeto simples -> Validar dados / Transformar dados

// // Definição dos campos esperados no corpo da requisição
// interface CreateRecadoDto {
//   titulo: string;
//   descricao: string;
//   de: string;
//   para: string;
// }

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
  create(@Body() createRecado: CreateRecadoDto) {
    return this.recadosService.create(createRecado);
  }

  @Patch(':id') // /recados/:id
  update(@Param('id') id: string, @Body() updateRecadoDto: UpdateRecadoDto) {
    return this.recadosService.update(id, updateRecadoDto);
  }

  @Delete(':id') // /recados/:id
  remove(@Param('id') id: string) {
    return this.recadosService.remove(id);
  }
}
