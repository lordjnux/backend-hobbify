import { Body, Controller, Get, Post } from '@nestjs/common';
import { HobbiesService } from './hobbies.service';
import { HobbieDto } from 'src/dtos/hobbie.dto';

@Controller('hobbies')
export class HobbiesController {
  constructor(private readonly hobbiesService: HobbiesService) {}

  @Post()
  createHobbie(@Body() hobbie: HobbieDto) {
    return this.hobbiesService.createHobbie(hobbie);
  }

  @Get()
  getHobbies() {
    return this.hobbiesService.getHobbies();
  }
}
