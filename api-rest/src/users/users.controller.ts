import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { BanUserDto, CreateAdminDto, UpdateUserDto } from '../dtos/user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';
import { AuthGuard } from '../authzero/auth/auth.guard';
import { RolesGuard } from '../roles/roles.guards';
import { AddContactDto, AddReactionDto } from 'src/dtos/addContact.dto';
import { ChatService } from '../chat/chat.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly chatService: ChatService,
  ) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('byhobbies/:id')
  @ApiBearerAuth()
  //@UseGuards(AuthGuard)
  findUsersWithSameHobbies(@Param('id') id: string) {
    return this.usersService.findUsersWithSameHobbies(id);
  }

  @Patch(':id/ban')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async banUser(@Param('id') userId: string, @Body() banUserDto: BanUserDto) {
    return await this.usersService.banUser(userId, banUserDto);
  }

  @Get(':id')
  @ApiBearerAuth()
  //just for ADMIN
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Post('createAdmin')
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.usersService.createAdmin(createAdminDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    console.log('id:', id);
    console.log('body:', updateUserDto);

    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
  @Post()
  @ApiOperation({
    summary: 'Agregar un contacto a un usuario',
    description: 'Agrega un contacto a un usuario en la base de datos',
  })
  async addContact(@Body() addContact: AddContactDto) {
    const { idUser, idContact } = addContact;
    return this.usersService.addContact(idUser, idContact);
  }

  @Post('reaction')
  @ApiOperation({
    summary: 'Agregar una reaction a un mensaje ene l chat',
    description: 'Agregar una reaction a un mensaje ene l chat',
  })
  async addRaaction(@Body() addReaction: AddReactionDto) {
    const { idMessage, reaction } = addReaction;
    return await this.chatService.addReaction(idMessage, reaction);
  }
}
