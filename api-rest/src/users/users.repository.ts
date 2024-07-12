import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { ResponseRepositories } from '../util/response-repositories';
import { Repository } from 'typeorm';
import { BanUserDto, CreateAdminDto, CreateUserDto, LoginUserDto } from '../dtos/user.dto';
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
    const users = await this.usersRepository.find()

    if (!users.length) return "There are no users yet";

    return users
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
      adminToSave.isAdmin = true;

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
        },
        where: { userId },
        relations: {
          hobbies: true,
          chats: true,
          payments: true,
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

  async banUser(userId: string, banUserDto: BanUserDto): Promise<ResponseRepositories> {
    let response = new ResponseRepositories();
    try {
      const user = await this.usersRepository.findOneBy({ userId });
      if (!user) throw new NotFoundException(`User(${userId}) not found.`);

      user.isBanned = banUserDto.isBanned;
      response.data = await this.usersRepository.save(user);

      console.log('userBanned...');
      console.log(user);
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

      console.log('userUpdated...');
      console.log(updatedUser);
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
    try{

      const foundUser = await this.findByIdUser(id)
      const deletedUser = await this.usersRepository.delete(foundUser)
      console.log(deletedUser);
      
    }catch (error) {
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
}
