import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
