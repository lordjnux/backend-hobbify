import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  Validate,
  Matches,
  IsInt,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { MatchPassword } from '../decorators/matchPassword.decorator';
import { HobbiesEntity } from '../entities/hobbies.entity';
import { Type } from 'class-transformer';

export class CreateUserDto {
  /**
   * User name
   * @example Robert Fischer
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  username: string;

  /**
   * User email. It is part of the access credentials.
   * @example robert.fischer@mailFake.com
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  /**
   * Password must contain at least one lowercase letter, one uppercase letter, one number, one of the following special characters: !@#$%^&*, and length between 8 and 15 characters
   * @example Secure17$
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    {
      message:
        'Password must contain at least one lowercase letter, one uppercase letter, one number, one of the following special characters: !@#$%^&*, and length between 8 and 15 characters',
    },
  )
  password: string;

  /**
   * Confirm password must contain at least one lowercase letter, one uppercase letter, one number, one of the following special characters: !@#$%^&*, and length between 8 and 15 characters
   * @example Secure17$
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    {
      message:
        'Confirm password must contain at least one lowercase letter, one uppercase letter, one number, one of the following special characters: !@#$%^&*, and length between 8 and 15 characters',
    },
  )
  @Validate(MatchPassword)
  confirmPassword: string;

  /**
   * Phone number
   * @example 57605
   */
  @ApiProperty()
  @IsOptional()
  @IsInt()
  phone: number;

  /**
   * Country name. (Is optional)
   * @example Colombia
   */
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  /**
   * City name. (Is optional)
   * @example Colombia
   */
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}

export class LoginUserWithTokenDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {
  @IsNotEmpty()
  @IsString()
  token: string;
}

export class UpdateUserDto {
  /**
   * User name
   * @example Robert Fischer
   */
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  username: string;

  /**
   * Password must contain at least one lowercase letter, one uppercase letter, one number, one of the following special characters: !@#$%^&*, and length between 8 and 15 characters
   * @example Secure17$
   */
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    {
      message:
        'Password must contain at least one lowercase letter, one uppercase letter, one number, one of the following special characters: !@#$%^&*, and length between 8 and 15 characters',
    },
  )
  password: string;

  /**
   * Confirm password must contain at least one lowercase letter, one uppercase letter, one number, one of the following special characters: !@#$%^&*, and length between 8 and 15 characters
   * @example Secure17$
   */
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    {
      message:
        'Confirm password must contain at least one lowercase letter, one uppercase letter, one number, one of the following special characters: !@#$%^&*, and length between 8 and 15 characters',
    },
  )
  @Validate(MatchPassword)
  confirmPassword: string;

  /**
   * Phone number
   * @example 57605
   */
  @ApiProperty()
  @IsOptional()
  @IsInt()
  phone: number;

  /**
   * Country name. (Is optional)
   * @example Colombia
   */
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  /**
   * City name. (Is optional)
   * @example Colombia
   */
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;

  @ApiProperty({ type: [HobbiesEntity] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HobbiesEntity)
  hobbies: HobbiesEntity[];
}
