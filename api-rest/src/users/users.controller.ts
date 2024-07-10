import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from '../dtos/user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiBearerAuth()
  //just for ADMIN
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  //just for ADMIN
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  //just for ADMIN and the same user can just update its profile
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    console.log("id:", id);
    console.log("body:", updateUserDto);
    
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  //just for ADMIN 
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
