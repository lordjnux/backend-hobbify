import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MongodbService } from './mongodb.service';

@Controller('mongodb')
export class MongodbController {
  constructor(private readonly mongodbService: MongodbService) {}

  @Post()
  create(@Body() createMongodbDto: any) {
    return this.mongodbService.create(createMongodbDto);
  }

  @Get()
  findAll() {
    return this.mongodbService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mongodbService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMongodbDto: any) {
    return this.mongodbService.update(+id, updateMongodbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mongodbService.remove(+id);
  }
}
