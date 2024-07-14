import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaymentsEntity } from "src/entities/payments.entity";
import { UsersEntity } from "src/entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class WebhookRepository {
    constructor(@InjectRepository(UsersEntity) 
    private readonly usersRepository: Repository<UsersEntity>,
  @InjectRepository(PaymentsEntity) 
  private readonly paymentsRepository: Repository<PaymentsEntity>) {}


    async checkoutComplete(checkout){

        try {
            const email = checkout.customer_details.email
            
            const usuario = await this.usersRepository.findOne({where: {email: email}})
            console.log(usuario);
            
            if(!usuario){
                console.log("No existe el usuario");
             }
             
             const newPay = {
                  amount: checkout.amount_total,
                  date: new Date(),
                  method: checkout.payment_method_types[0],
                  user: usuario,
                  suscription: null
             }
            const payment = await this.paymentsRepository.save(newPay)

            console.log(payment);
            
            
        } catch (error) {
            console.log(error);        
            
        }

       
       
    }
}