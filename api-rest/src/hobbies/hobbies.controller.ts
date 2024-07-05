import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { HobbiesService } from './hobbies.service';
import { CreateHobbyDto, UpdateHobbyDto } from '../dtos/hobby.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('hobbies')
@ApiTags('Hobbies')
export class HobbiesController {
  constructor(private readonly hobbiesService: HobbiesService) {}

  @Post()
  create(@Body() createHobbyDto: CreateHobbyDto) {
    return this.hobbiesService.createHobbie(createHobbyDto);
  }

  @Get()
  findAll() {
    return this.hobbiesService.findAllHobbies();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hobbiesService.findOneHobbie(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateHobbyDto: UpdateHobbyDto) {
    return this.hobbiesService.updateHobbie(+id, updateHobbyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hobbiesService.removeHobbie(+id);
  }
}
