import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/common/dto/pagination';
import { ParseIntIdPipe } from 'src/common/pipes/parse-int-id.pipe';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';
import { TimingConnectionInterceptor } from 'src/common/interceptors/timing-connection.interceptor';
import { ErrorHandlingInterceptor } from 'src/common/interceptors/error-handling.interceptor';
import { SimpleCacheInterceptor } from 'src/common/interceptors/simple-cache.interceptor';
import { ChangeDataInterceptor } from 'src/common/interceptors/change-data.interceptor';
import { AuthTokenInterceptor } from 'src/common/interceptors/auth-token.interceptor';
import { Request } from 'express';

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

// @UseInterceptors(SimpleCacheInterceptor)
// @UseInterceptors(ChangeDataInterceptor)
@UseInterceptors(AuthTokenInterceptor)
@Controller('recados')
@UsePipes(ParseIntIdPipe)
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}
  // Encontrar todos os recados
  @HttpCode(HttpStatus.OK) // Define o código de status HTTP para 200 OK
  @Get() // /recados
  // @UseInterceptors(TimingConnectionInterceptor, ErrorHandlingInterceptor)
  async findAll(@Query() pagination: PaginationDto, @Req() req: Request) {
    console.log('RecadosController', req['user']);
    // console.log(
    //   'RecadosController: findAll called with pagination:',
    //   pagination,
    // );
    const recados = await this.recadosService.findAll(pagination);
    // throw new Error('Erro ao buscar recados'); // Simulando um erro para testar o interceptor de tratamento de erros
    return recados;
  }

  // Encontrar um recado específico
  @Get(':id') // /recados/:id
  // @UseInterceptors(AddHeaderInterceptor, ErrorHandlingInterceptor)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.recadosService.findOne(id);
  }

  // Criar um novo recado
  @Post() // /recados
  create(@Body() createRecado: CreateRecadoDto) {
    return this.recadosService.create(createRecado);
  }

  @Patch(':id') // /recados/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecadoDto: UpdateRecadoDto,
  ) {
    return this.recadosService.update(id, updateRecadoDto);
  }

  @Delete(':id') // /recados/:id
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.recadosService.remove(id);
  }
}
