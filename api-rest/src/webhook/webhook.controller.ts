import {
  Controller,
  Post,
  Headers,
  Get,
  RawBodyRequest,
  Req,
  Res,
  Injectable,
  Inject,
} from '@nestjs/common';
import {Request, Response} from 'express';
import Stripe from 'stripe';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  
  private readonly client: Stripe;
  constructor(private readonly webhookService: WebhookService) {
    this.client = new Stripe('sk_test_51PYeTG2NHKCHC8oyuorgbNLNYc3apjffL7qRMpXWAB16Yypodf3XoMxCAuvdEO61VfE3GjhnqEErCZWce6tcDEwx00begqaZoi', {
      typescript: true,
    });
  }
  

  @Get('/')
  async index(){
  
  }
  

  @Post('/stripe')
  async webhooks(
    @Headers('stripe-signature') sig: string,
    @Req() req: RawBodyRequest<Request>,
    @Res() res: Response
  ) {
    let event: Stripe.Event;

    try {
      event = this.client.webhooks.constructEvent(
        req.rawBody,
        sig,
        'whsec_zW71wd7jUuZG2MGmkt1o3ZIW9bkzhE38'
      );
    } catch (err) {
      // On error, log and return the error message
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }


    console.log('✅ Success:', event.id);

    
    switch (event.type) {
      case 'checkout.session.completed':
        const checkout = event.data.object;
        this.webhookService.subscriptionCheckoutComplete(checkout)
        console.log({ checkout });
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    

   
    res.status(200).json({received: true});
  }

}