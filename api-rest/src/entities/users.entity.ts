import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatsEntity } from './chats.entity';
import { PaymentsEntity } from './payments.entity';

@Entity({
  name: 'users',
})
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({
    type: 'varchar',
    length: 40,
    nullable: false,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 40,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 60,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 30,
  })
  city: string;

  @Column({
    type: 'varchar',
    length: 30,
  })
  country: string;

  @Column({
    type: 'int',
  })
  phone: string;

  @OneToMany(() => ChatsEntity, (chats) => chats.chatId)
  @JoinColumn({
    name: 'chats',
  })
  chats: ChatsEntity[];

  @OneToMany(() => PaymentsEntity, (payments) => payments.user)
  @JoinColumn({
    name: 'payments',
  })
  payments: PaymentsEntity[];
}
