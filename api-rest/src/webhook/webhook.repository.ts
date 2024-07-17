import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaymentsEntity } from "src/entities/payments.entity";
import { SuscriptionEntity } from "src/entities/suscription.entity";
import { UsersEntity } from "src/entities/users.entity";
import Stripe from "stripe";
import { Repository } from "typeorm";
import { config as dotenvConfig } from 'dotenv';
import { MailerService } from "@nestjs-modules/mailer";
dotenvConfig({ path: './.env.development.local' });

@Injectable()
export class WebhookRepository {
    private stripe: Stripe
    constructor(@InjectRepository(UsersEntity) 
    private readonly usersRepository: Repository<UsersEntity>,
  @InjectRepository(PaymentsEntity) 
  private readonly paymentsRepository: Repository<PaymentsEntity>,
   @InjectRepository(SuscriptionEntity) 
   private readonly suscriptionRepository: Repository<SuscriptionEntity>,
private readonly mailerService: MailerService) {

    this.stripe = new Stripe(process.env.SECRET_API_KEY, {
        apiVersion: '2024-06-20',
      });
   }



    async checkoutComplete(checkout){

        try {
            const email = checkout.customer_details.email
            
            const usuario = await this.usersRepository.findOne({where: {email: email}})
            
            
            if(!usuario){
                console.log("No existe el usuario");
             }

             const invoice = await this.stripe.invoices.retrieve(checkout.invoice)

             console.log(invoice);
             
 
             const nombreDelPlan = invoice.lines.data[0].plan.nickname

             const findSus = await this.suscriptionRepository.findOne({where: {plan: nombreDelPlan}})
             
         
             
             const newPay = new PaymentsEntity();
             newPay.amount = checkout.amount_total;
             newPay.date = new Date();
             newPay.status = checkout.payment_status;
             newPay.method = checkout.payment_method_types[0];
             newPay.user = usuario;
             newPay.suscription = findSus;
             newPay.invoice = invoice.invoice_pdf;
             
             
            const payment = await this.paymentsRepository.save(newPay)

            const url = invoice.invoice_pdf
            await this.mailerService.sendMail({
                to: email,
                subject: 'thanks for your purchase!',
                template: './welcome',
                context: {
                    name: checkout.customer_details.name,
                    url
                }
            })
            
            
            
        } catch (error) {
           
            console.log(error);        
            
        }

       
       
    }
}