import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { State } from 'src/entities/hobbies.entity';

export class CreateHobbyDto {
  /**
   * Name of hobby
   * @example Read
   */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * String name of emoji
   * @example :book
   */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  emoji: string;
}

export class UpdateHobbyDto {
  /**
   * Name of hobby
   * @example Read
   */
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * String name of emoji
   * @example :book
   */
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  emoji: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  state:State
}

export class PartialHobbyDto {
  /**
   * Hobby name
   * @example Read
   */
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;
}
