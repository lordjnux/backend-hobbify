<<<<<<< HEAD
import { Body, Controller, Get, Post } from '@nestjs/common';
import { HobbiesService } from './hobbies.service';
import { HobbieDto } from 'src/dtos/hobbie.dto';

@Controller('hobbies')
=======
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HobbiesService } from './hobbies.service';
import { CreateHobbyDto, UpdateHobbyDto } from '../dtos/hobby.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('hobbies')
@ApiTags('Hobbies')
>>>>>>> 7e501cd2e5886239fe2a280b12ece4cf5c88c5b5
export class HobbiesController {
  constructor(private readonly hobbiesService: HobbiesService) {}

  @Post()
<<<<<<< HEAD
  createHobbie(@Body() hobbie: HobbieDto) {
    return this.hobbiesService.createHobbie(hobbie);
  }

  @Get()
  getHobbies() {
    return this.hobbiesService.getHobbies();
=======
  create(@Body() createHobbyDto: CreateHobbyDto) {
    return this.hobbiesService.create(createHobbyDto);
  }

  @Get()
  findAll() {
    return this.hobbiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hobbiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHobbyDto: UpdateHobbyDto) {
    return this.hobbiesService.update(+id, updateHobbyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hobbiesService.remove(+id);
>>>>>>> 7e501cd2e5886239fe2a280b12ece4cf5c88c5b5
  }
}
