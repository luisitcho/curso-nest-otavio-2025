import { Controller, Get } from '@nestjs/common';
import { ConceitosManualService } from './conceitos-manual.service';

@Controller('conceitos-manual')
export class ConceitosManualController {
  constructor(
    private readonly conceitosManuaisService: ConceitosManualService,
  ) {}
  @Get()
  home(): string {
    return this.conceitosManuaisService.solutionHome();
  }
}
