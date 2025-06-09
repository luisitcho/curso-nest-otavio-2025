import { Injectable, NotFoundException } from '@nestjs/common';
import { RecadoEntity } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoasService } from 'src/pessoas/pessoas.service';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(RecadoEntity)
    private readonly recadoRepository: Repository<RecadoEntity>,
    private readonly pessoasService: PessoasService,
  ) {}

  throwNotFoundError() {
    throw new NotFoundException('Recado não encontrado');
  }

  async findAll() {
    const recados = await this.recadoRepository.find();
    return recados;
  }

  async findOne(id: number) {
    // const recado = this.recados.find((recado) => recado.id === Number(id));

    const recado = await this.recadoRepository.findOne({
      where: {
        id,
      },
    });

    if (recado) return recado;

    // throw new HttpException('Recado não encontrado', HttpStatus.NOT_FOUND);
    this.throwNotFoundError();
  }

  async create(createRecadoDto: CreateRecadoDto) {
    // Encontrar a pessoa que está criando o recado
    // Encontrar a pessoa para quem o recado está sendo enviado

    const novoRecado = {
      ...createRecadoDto,
      lido: false,
      data: new Date(),
    };

    const reacdo = this.recadoRepository.create(novoRecado);

    return this.recadoRepository.save(reacdo);
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const partialUpdateRecadoDto = {
      lido: updateRecadoDto?.lido,
      texto: updateRecadoDto?.texto,
    };

    const recado = await this.recadoRepository.preload({
      id,
      ...partialUpdateRecadoDto,
    });

    if (!recado) {
      this.throwNotFoundError();
    }

    return this.recadoRepository.save(recado as RecadoEntity);
  }

  async remove(id: number) {
    const recado = await this.recadoRepository.findOneBy({ id });

    if (!recado) {
      this.throwNotFoundError();
    }

    return this.recadoRepository.remove(recado as RecadoEntity);
  }
}
