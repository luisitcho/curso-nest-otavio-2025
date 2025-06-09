import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRespository: Repository<Pessoa>,
  ) {}

  async create(createPessoaDto: CreatePessoaDto) {
    try {
      const pessoaData = {
        nome: createPessoaDto.nome,
        passwordHash: createPessoaDto.password,
        email: createPessoaDto.email,
      };

      const pessoa = this.pessoaRespository.create(pessoaData);

      await this.pessoaRespository.save(pessoa);
      return pessoa;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('E-mail ja está cadastrado!');
      }

      throw error;
    }
  }

  async findAll() {
    const pessoas = this.pessoaRespository.find({
      order: {
        id: 'desc',
      },
    });

    return pessoas;
  }

  async findOne(id: number) {
    return `This action returns a #${id} pessoa`;
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const dataPerson = {
      nome: updatePessoaDto?.nome,
      passwordHash: updatePessoaDto?.password,
    };

    const person = await this.pessoaRespository.preload({
      id,
      ...dataPerson,
    });

    if (!person)
      throw new NotFoundException('Não foi possivel atualizar este usuário!');

    return this.pessoaRespository.save(person);
  }

  async remove(id: number) {
    const person = await this.pessoaRespository.findOneBy({ id });

    if (!person) throw new NotFoundException('Pessoa não encontrada!');

    return this.pessoaRespository.remove(person);
  }
}
