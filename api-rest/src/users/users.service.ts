import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BanUserDto, CreateAdminDto, UpdateUserDto } from '../dtos/user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findAll() {
    return this.usersRepository.findAll();
  }

  findUsersWithSameHobbies(userId: string) {
    return this.usersRepository.findUsersWithSameHobbies(userId);
  }

  findById(id: string) {
    return this.usersRepository.findByIdUser(id);
  }

  createAdmin(createAdminDto: CreateAdminDto) {
    return this.usersRepository.createAdmin(createAdminDto);
  }

  banUser(userId: string, banUserDto: BanUserDto) {
    return this.usersRepository.banUser(userId, banUserDto);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.UpdateUser(id, updateUserDto);
  }

  remove(id: string) {
    return this.usersRepository.remove(id);
  }
  
  addContact(userId: string, contactId: string){
    return this.usersRepository.addContact(userId, contactId);
  }



  // async addContact(id: string, contactId: string) {
  //   const user = await this.usersRepository.findOne({
  //     where: { id },
  //     relations: ['contacts'],
  //   }); 
  //   if (!user) throw new NotFoundException('Usuario no encontrado');

  //   const contact = await this.usersRepository.findOne({
  //     where: { id: contactId },
  //   });
  //   if (!contact) throw new NotFoundException('Contacto no encontrado');

  //   if (user.role === contact.role)
  //     throw new BadRequestException(
  //       'No puedes agregar un contacto con el mismo rol',
  //     );

  //   const contacts = user.contacts.map((contact) => contact.id);
  //   if (!contacts.includes(contact.id)) {
  //     user.contacts.push(contact);
  //     await this.usersRepository.save(user);
  //   }

  //   const userContact = await this.usersRepository.findOne({
  //     where: { id: contactId },
  //     relations: ['contacts'],
  //   });
  //   const contactsContact = userContact.contacts.map((contact) => contact.id);
  //   if (!contactsContact.includes(user.id)) {
  //     userContact.contacts.push(user);
  //     await this.usersRepository.save(userContact);
  //     return user;
  //   }
  //   return 'Usuario ya tiene este contacto';
  // }




}
