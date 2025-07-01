import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- aqui
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from 'src/recados/recados.module';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { SimpleMiddleware } from 'src/common/middlewares/simple.middlware';
import { OtherMiddleware } from 'src/common/middlewares/other.middleware';
import { MyExceptionFilter } from 'src/common/filters/my-exception.filter';
import { ErrorExceptionFilter } from 'src/common/filters/error-exception.filter';

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
  providers: [
    AppService,
    // { provide: 'APP_FILTER', useClass: MyExceptionFilter },
    { provide: 'APP_FILTER', useClass: ErrorExceptionFilter },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleMiddleware, OtherMiddleware).forRoutes({
      path: '*', // Aplica o middleware a todas as rotas
      method: RequestMethod.ALL, // Aplica a todos os métodos HTTP
    });
  }
}
