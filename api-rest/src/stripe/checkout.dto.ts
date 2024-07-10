import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, isNotEmpty } from "class-validator";

export class CheckoutDto {
    @IsNotEmpty()
    @ApiProperty({ example: 'price_1PYeWx2NHKCHC8oyMf6ZsTxO', description: 'Price id of product' })
    priceId: string
}