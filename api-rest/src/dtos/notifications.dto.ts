import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class NotificationsDto {
  /**
   * Token device
   * @example ExponentPushToken[AAaa11__bb22]
   */
  @IsString()
  @ApiProperty()
  token: string;

  /**
   * Title de la notificación
   * @example Nombre del emisor
   */
  @IsString()
  @ApiProperty()
  title: string;

  /**
   * Cuerpo de la notificación
   * @example Hola como estás?
   */
  @IsString()
  @ApiProperty()
  body: string;
}
