import {
  Column,
  Entity,
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

  @Column()
  invoice: string;

  @Column()
  status: string;

  @ManyToOne(() => UsersEntity, (user) => user.payments)
  user: UsersEntity;

  @ManyToOne(() => SuscriptionEntity, (suscription) => suscription.payments)
  suscription: SuscriptionEntity;
}

