import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: './.env.development.local' });


@Injectable()
export class StripeService {

  async getStripe() {
    
  const stripe = new Stripe(process.env.SECRET_API_KEY)
  const prices = await stripe.prices.list({active: true})
  

  return prices
  
  
  }

  async checkout(priceId){
    const stripe = new Stripe(process.env.SECRET_API_KEY)

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel'
    })

    return {url: session.url}
    
  }
  
  

  
}
