import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { UsersEntity } from './users.entity';

@Entity({
  name: 'chats',
})
export class ChatsEntity {
  @PrimaryColumn('uuid')
  chatId: string;

  @Column({
    type: 'varchar',
    length: 40,
  })
  createdAt: string;

  @Column({
    type: 'varchar',
    length: 40,
  })
  createdBy: string;

  @Column({
    type: 'varchar',
    length: 15,
    nullable: false,
  })
  type: string;

  @Column({
    type: 'varchar',
    length: 15,
    nullable: false,
  })
  state: string;

  @ManyToOne(() => UsersEntity, (user) => user.chats)
  user: UsersEntity;
}
