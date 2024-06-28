import { Subscription } from 'rxjs';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SuscriptionEntity } from './suscription.entity';
import { UsersEntity } from './users.entity';

@Entity({
  name: 'payments',
})
export class PaymentsEntity {
  @PrimaryGeneratedColumn('uuid')
  paymentId: string;

  @Column()
  amount: string;

  @Column()
  date: Date;

  @Column()
  method: string;

  @ManyToOne(() => UsersEntity, (user) => user.payments)
  @JoinColumn({
    name: 'userId',
  })
  user: UsersEntity;

  @OneToOne(() => SuscriptionEntity, (suscription) => suscription.suscriptionId)
  @JoinColumn({
    name: 'suscriptionId',
  })
  suscription: SuscriptionEntity;
}
