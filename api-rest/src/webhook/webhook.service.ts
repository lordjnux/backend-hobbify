import { Injectable } from '@nestjs/common';
import { WebhookRepository } from './webhook.repository';


@Injectable()
export class WebhookService {
  constructor(private readonly webhookRepository: WebhookRepository) {}

  async subscriptionCheckoutComplete(checkout) {
   return await this.webhookRepository.checkoutComplete(checkout)
  }

  async customerSubscriptionUpdate(){

  }

  async customerSubcriptionDelete(){
      
  }
}
