import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CredentialsDto {
  /**
   * User email. It is part of the access credentials.
   * @example jeroham.sanchez@example.com
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(200)
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
  // TODO: PENDIENTE: DESCOMENTAR ESTAS LÍNEAS CUANDO ESTÉ TODO PROBADO,
  // PARA LAS PRUEBAS QUE HARÉ NO NECESITO QUE SEA TAN SEGURO AÚN
  //   @Matches(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
  //     {
  //       message:
  //         'Password must contain at least one lowercase letter, one uppercase letter, one number, one of the following special characters: !@#$%^&*, and length between 8 and 15 characters',
  //     },
  //   )
  password: string;
}
