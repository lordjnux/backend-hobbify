import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AddContactDto {
  @ApiProperty({
    description: 'Id del usuario que desea agregar un contacto',
    example: 'a5da798b-b58b-46cc-af42-927e2d009782',
  })
  @IsUUID()
  idUser: string;

  @ApiProperty({
    description: 'Id del contacto que se desea agregar',
    example: 'fcbf7158-cae8-418b-963c-1fcb446c3f21',
  })
  @IsUUID()
  idContact: string;
}
