import { UserMockEntity } from 'src/auth-own/usersMock';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from './users.entity';

enum State {
  PENDING = "pending",
  APPROVED = "approved",
  DENIED = "denied"
}

@Entity({
  name: 'hobbies',
})
export class HobbiesEntity {
  @PrimaryGeneratedColumn()
  hobbieId: number;

  @Column({
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  emoji: string;

  @Column({
    type: 'enum',
    enum: State,
    default: State.PENDING,
  })
  state: State;

  @ManyToMany(() => UsersEntity, (users) => users.hobbies)
  users: UserMockEntity[];
}
