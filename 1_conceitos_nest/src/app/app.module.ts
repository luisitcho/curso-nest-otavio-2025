import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- aqui
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from 'src/recados/recados.module';
import { PessoasModule } from 'src/pessoas/pessoas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // ou 'postgres' se estiver rodando tudo no Docker
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'myapp_db',
      autoLoadEntities: true, // carrega entidades automaticamente sem precisar especificar
      synchronize: true, // Sincroniza com o DB | ATENÇÃO: só para desenvolvimento
    }),
    RecadosModule,
    PessoasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
