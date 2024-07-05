import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get()
  getStripe(){

    return this.stripeService.getStripe();
  }
  
  @Post()
  checkout(@Body() id){
    const {priceId} = id

    return this.stripeService.checkout(priceId);

  }
}