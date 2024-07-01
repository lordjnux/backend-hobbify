import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
    length: 255,
    nullable: false,
    select: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  city: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  country: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  phone: string;

  @OneToMany(() => ChatsEntity, (chat) => chat.user)
  chats: ChatsEntity[];

  @OneToMany(() => PaymentsEntity, (payments) => payments.user)
  payments: PaymentsEntity[];
}
