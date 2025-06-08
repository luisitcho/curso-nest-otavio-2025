import { Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecadoEntity } from './entities/recado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecadoEntity])], // Aqui você deve especificar suas entidades, por exemplo: RecadoEntity],
  controllers: [RecadosController],
  providers: [RecadosService],
})
export class RecadosModule {}
