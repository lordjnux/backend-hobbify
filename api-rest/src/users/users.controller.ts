import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { BanUserDto, CreateAdminDto, UpdateUserDto } from '../dtos/user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { AuthGuard } from 'src/authzero/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guards';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiBearerAuth()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  //just for ADMIN
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Post("createAdmin")
  createAdmin(@Body() createAdminDto: CreateAdminDto){
    return this.usersService.createAdmin(createAdminDto)
  }

  @Patch(':id/ban')
  @ApiBearerAuth()
  //just for ADMIN
  async banUser(
    @Param('id') userId: string,
    @Body() banUserDto: BanUserDto,
  ) {
    return await this.usersService.banUser(userId, banUserDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  //ADMIN and an user can just update its profile
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    console.log("id:", id);
    console.log("body:", updateUserDto);
    
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  //ADMIN and an user can delete its profile
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
