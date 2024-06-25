import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/publico')
  getEjemplo(): string {
    return this.appService.getEjemplo();
  }

  @Get('/privado')
  getEjemploPrivado(): string {
    return this.appService.getEjemploPrivado();
  }
}
