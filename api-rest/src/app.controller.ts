import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './authzero/auth/auth.guard';
<<<<<<< HEAD
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HobbieDto } from './dtos/hobbie.dto';
=======
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
>>>>>>> 7e501cd2e5886239fe2a280b12ece4cf5c88c5b5

@Controller()
@ApiTags('Root')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/privado')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Ruta privada. Solo acceso después de login ok' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve estring: "Ejemplo privado".',
  })
  getEjemploPrivado(): string {
    return this.appService.getEjemploPrivado();
  }
<<<<<<< HEAD

  @Post()
  @ApiOperation({ summary: 'Ejemplo de un post' })
  @ApiResponse({
    status: 201,
    description: 'Hobbie creado satisfactoriamente.',
  })
  @ApiBody({ description: 'Item data', type: HobbieDto })
  create(@Body() createItemDto: HobbieDto) {
    return createItemDto;
  }
=======
>>>>>>> 7e501cd2e5886239fe2a280b12ece4cf5c88c5b5
}
