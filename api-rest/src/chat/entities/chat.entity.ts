import { UsersEntity } from 'src/entities/users.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    type: 'text',
  })
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UsersEntity, (user) => user.chats)
  from: UsersEntity;

  @ManyToOne(() => UsersEntity, (user) => user.chats)
  to: UsersEntity;

}
