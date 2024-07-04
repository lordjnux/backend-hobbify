import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ReactionDto {
    @IsNotEmpty()
    @ApiProperty({ example: '👍', description: 'Emoji of the reaction' })
    @IsString()
    reactions: string;
}