import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class MessageDto {
    @IsNotEmpty()
    @ApiProperty({ example: 'sebastialvaa@mail.com', description: 'Email of the user' })
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @ApiProperty({ example: 'text', description: 'Type of the message' })
    @IsString()
    type: string;
  
    @IsNotEmpty()
    @ApiProperty({ example: 'prueba 123', description: 'Content of the message' })
    @IsString()
    message: string;
  
    @ApiProperty({ example: ["👍","like"], description: 'Reactions to the message, is optional', isArray: true })
    @IsArray()
    @IsOptional()
    reactions: any[];
}

export class PutMessage extends PickType(MessageDto, ['message']) {}

