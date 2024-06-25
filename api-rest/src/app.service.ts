import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getEjemploPrivado(): string {
    return "Ejemplo privado";
  }
  getEjemplo(): string {
    return "Ejemplo publico";
  }
  getHello(): string {
    return 'Hello World!';
  }
}
