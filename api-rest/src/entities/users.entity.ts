import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chat } from './chats.entity';
import { PaymentsEntity } from './payments.entity';
import { HobbiesEntity } from './hobbies.entity';

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
  phone: number;

  @Column({ nullable: true })
  biography: string;

  @Column({ nullable: true })
  idealMate: string; //Tu compañero ideal

  @Column({ nullable: true })
  hobbyIntensity: string; //Intensidad de hobbies

  @Column({
    type: 'simple-json',
    nullable: false,
    default: () => `'[
    {"first_perfil": true}, 
    {"first_feed": true},
    {"first_perfil_no": true},
    {"first_lista_chat": true},
    {"first_chat": true}
  ]'`,
  })
  firstTimes: {
    first_perfil: boolean;
    first_feed: boolean;
    first_perfil_no: boolean;
    first_lista_chat: boolean;
    first_chat: boolean;
  }[];

  @Column({ nullable: true })
  image: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: false })
  isBanned: boolean;

  @ManyToMany(() => UsersEntity)
  @JoinTable()
  contacts: UsersEntity[];

  @OneToMany(() => Chat, (chat) => chat.from)
  chats: Chat[];

  @OneToMany(() => PaymentsEntity, (payments) => payments.user)
  payments: PaymentsEntity[];

  @ManyToMany(() => HobbiesEntity)
  @JoinTable()
  hobbies: HobbiesEntity[];

  @Column({ default: false })
  isExternal: boolean;

  @Column({ nullable: true })
  profileImage: string;
}
