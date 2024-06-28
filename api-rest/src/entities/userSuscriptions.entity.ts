import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';

@Entity({
  name: 'user-suscriptions',
})
export class UserSuscriptionEntity {
  @PrimaryGeneratedColumn('uuid')
  suscriptionId: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @OneToOne(() => UsersEntity, (user) => user.userId)
  @JoinColumn({
    name: 'userId',
  })
  user: UsersEntity;
}
