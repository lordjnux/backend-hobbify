import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CheckoutDto } from './checkout.dto';

@Controller('stripe')
@ApiTags('Buy/Subscribe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get()
  @ApiOperation({ summary: 'Method to get all products(Subscribe)' })
  getStripe(){

    return this.stripeService.getStripe();
  }
  
  @Post()
  @ApiOperation({ summary: 'Method to get a product url to pay with card' })
  @ApiBody({ description: 'priceId of product', type: CheckoutDto })

  checkout(@Body() id: CheckoutDto) {
    const {priceId} = id

    return this.stripeService.checkout(priceId);

  }
}