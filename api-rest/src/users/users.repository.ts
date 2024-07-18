import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { ResponseRepositories } from '../util/response-repositories';
import { In, Repository } from 'typeorm';
import {
  BanUserDto,
  CreateAdminDto,
  CreateUserDto,
  LoginUserDto,
} from '../dtos/user.dto';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  private responseRepositories: ResponseRepositories = {
    error: false,
    message: '',
    data: undefined,
  };

  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async findAll() {
    const users = await this.usersRepository.find();

    if (!users.length) return 'There are no users yet';

    return users;
  }

  async findUsersWithSameHobbies(
    userId: string,
  ): Promise<ResponseRepositories> {
    this.responseRepositories = new ResponseRepositories();
    try {
      const user = await this.usersRepository.findOne({
        where: { userId },
        relations: ['hobbies'],
      });

      if (!user) {
        throw new NotFoundException(`User(${userId}) not found.`);
      }

      const userHobbies = user.hobbies.map((hobbie) => hobbie.hobbieId);

      if (userHobbies.length === 0) {
        this.responseRepositories = {
          error: false,
          message: 'The user has no hobbies.',
          data: [],
        };
        return this.responseRepositories;
      }

      const isBanned = false;
      const usersWithSameHobbies = await this.usersRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.hobbies', 'hobbies')
        .where('hobbies.hobbieId IN (:...userHobbies)', { userHobbies })
        .andWhere('user.isBanned = :isBanned', { isBanned })
        .andWhere('user.userId != :userId', { userId })
        .getMany();

      const userIdsWithSameHobbies = usersWithSameHobbies.map((u) => u.userId);

      const completeUsersWithSameHobbies = await this.usersRepository.find({
        where: { userId: In(userIdsWithSameHobbies) },
        relations: ['hobbies'],
      });

      this.responseRepositories = {
        error: false,
        message: 'Users with same hobbies retrieved successfully',
        data: completeUsersWithSameHobbies,
      };
    } catch (error: any) {
      console.error(error);

      this.responseRepositories = {
        error: true,
        message: error.message,
        data: error,
      };
    } finally {
      return this.responseRepositories;
    }
  }

  async signIn(signInUser: CreateUserDto): Promise<ResponseRepositories> {
    this.responseRepositories = new ResponseRepositories();
    try {
      const existUser = await this.findByEmail(signInUser.email);

      if (existUser.error || existUser.data) {
        this.responseRepositories = {
          error: true,
          message: 'Already exist an user with this email',
          data: undefined,
        };
        throw new ConflictException('Already exist an user with this email');
      }

      const hashPass = await bcrypt.hash(signInUser.password, 10);

      if (!hashPass) {
        this.responseRepositories = {
          error: true,
          message: 'Password can not be hashed',
          data: undefined,
        };
        throw new InternalServerErrorException("Password can't not be hashed");
      }

      signInUser.password = hashPass;
      const userToSave = plainToClass(UsersEntity, signInUser);

      const userSaved = await this.usersRepository.save(userToSave);
      const getAllDataUserSaved = await this.findByIdUser(userSaved.userId);

      this.responseRepositories.data = plainToClass(
        UsersEntity,
        getAllDataUserSaved,
      );
    } catch (error: any) {
      console.error(error);

      this.responseRepositories = {
        error: true,
        message: error.message,
        data: error,
      };
    } finally {
      return this.responseRepositories;
    }
  }

  async createAdmin(createAdminDto: CreateAdminDto) {
    this.responseRepositories = new ResponseRepositories();
    try {
      const existUser = await this.findByEmail(createAdminDto.email);

      if (existUser.error || existUser.data) {
        this.responseRepositories = {
          error: true,
          message: 'Already exist an user with this email',
          data: undefined,
        };
        throw new ConflictException('Already exist an user with this email');
      }

      const hashPass = await bcrypt.hash(createAdminDto.password, 10);

      if (!hashPass) {
        this.responseRepositories = {
          error: true,
          message: 'Password can not be hashed',
          data: undefined,
        };
        throw new InternalServerErrorException("Password can't not be hashed");
      }

      createAdminDto.password = hashPass;
      const adminToSave = plainToClass(UsersEntity, createAdminDto);
      adminToSave.isAdmin = true; // Ensure this is correctly set

      // Log admin data before saving

      const adminSaved = await this.usersRepository.save(adminToSave);
      const getAllDataAdminSaved = await this.findByIdUser(adminSaved.userId);

      this.responseRepositories.data = plainToClass(
        UsersEntity,
        getAllDataAdminSaved,
      );
    } catch (error: any) {
      console.error(error);

      this.responseRepositories = {
        error: true,
        message: error.message,
        data: error,
      };
    } finally {
      return this.responseRepositories;
    }
  }

  async findByIdUser(userId: string) {
    try {
      const result = await this.usersRepository.findOne({
        select: {
          userId: true,
          email: true,
          password: false,
          username: true,
          city: true,
          country: true,
          phone: true,
          biography: true,
          idealMate: true,
          hobbyIntensity: true,
          isAdmin: true,
          profileImage: true,
        },
        where: { userId },
        relations: {
          hobbies: true,
          chats: true,
          payments: {
            suscription: true,
          },
        },
      });
      return result;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  }

  async findByEmail(email: string): Promise<ResponseRepositories> {
    this.responseRepositories = new ResponseRepositories();
    try {
      const result = await this.usersRepository.findOne({
        where: {
          email,
        },
        relations: {
          hobbies: true,
          chats: true,
          payments: {
            suscription: true,
          },
        },
      });

      this.responseRepositories.data = result ?? undefined;
    } catch (error: any) {
      console.error(error);

      this.responseRepositories = {
        error: true,
        message: error.message,
        data: error,
      };
    } finally {
      return this.responseRepositories;
    }
  }

  async findByCredentials(
    credentials: LoginUserDto,
  ): Promise<ResponseRepositories> {
    this.responseRepositories = new ResponseRepositories();
    try {
      const result = await this.usersRepository.findOne({
        select: {
          userId: true,
          email: true,
          password: true,
          username: true,
          city: true,
          country: true,
          phone: true,
          isAdmin: true,
          isBanned: true,
          biography: true,
          idealMate: true,
          hobbyIntensity: true,
          profileImage: true,
        },
        where: {
          email: credentials.email,
        },
        relations: {
          hobbies: true,
          chats: true,
          payments: true,
        },
      });
      this.responseRepositories.data = result ?? undefined;
    } catch (error: any) {
      console.error(error);

      this.responseRepositories = {
        error: true,
        message: error.message,
        data: error,
      };
    } finally {
      return this.responseRepositories;
    }
  }

  async banUser(
    userId: string,
    banUserDto: BanUserDto,
  ): Promise<ResponseRepositories> {
    let response = new ResponseRepositories();
    try {
      const user = await this.usersRepository.findOneBy({ userId });
      if (!user) throw new NotFoundException(`User(${userId}) not found.`);

      user.isBanned = true;
      response.data = await this.usersRepository.save(user);
    } catch (error: any) {
      this.responseRepositories = {
        error: true,
        message: error.message,
        data: error,
      };
    } finally {
      return response;
    }
  }

  async UpdateUser(id: string, updateUserDto: Partial<UsersEntity>) {
    this.responseRepositories = new ResponseRepositories();
    try {
      const user = await this.usersRepository.findOneBy({ userId: id });
      if (!user) throw new NotFoundException(`User(${id}) not found.`);

      const updatedUser = Object.assign(user, updateUserDto);
      this.responseRepositories.data =
        await this.usersRepository.save(updatedUser);
    } catch (error) {
      console.error(error);
      this.responseRepositories = {
        error: true,
        message: error.message,
        data: error,
      };
    } finally {
      return this.responseRepositories;
    }
  }

  async remove(id: string) {
    try {
      const foundUser = await this.findByIdUser(id);
      const deletedUser = await this.usersRepository.delete(foundUser);
    } catch (error) {
      console.error(error);
      this.responseRepositories = {
        error: true,
        message: error.message,
        data: error,
      };
    } finally {
      return this.responseRepositories;
    }
  }

  async addContact(userId: string, contactId: string) {
    const user = await this.usersRepository.findOne({
      where: { userId },
      relations: ['contacts'],
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const contact = await this.usersRepository.findOne({
      where: { userId: contactId },
    });
    if (!contact) throw new NotFoundException('Contacto no encontrado');

    const contacts = user.contacts.map((contact) => contact.userId);
    if (!contacts.includes(contact.userId)) {
      user.contacts.push(contact);
      await this.usersRepository.save(user);
    }

    const userContact = await this.usersRepository.findOne({
      where: { userId: contactId },
      relations: ['contacts'],
    });
    const contactsContact = userContact.contacts.map(
      (contact) => contact.userId,
    );
    if (!contactsContact.includes(user.userId)) {
      userContact.contacts.push(user);
      await this.usersRepository.save(userContact);
      return user;
    }
    return 'Usuario ya tiene este contacto';
  }
}
