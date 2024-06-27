import { ApiProperty } from "@nestjs/swagger";

export class HobbyDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  imgUrl: string;
}
