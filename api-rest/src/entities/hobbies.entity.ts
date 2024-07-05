import { UserMockEntity } from 'src/auth-own/usersMock';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from './users.entity';

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
    type: 'text',
  })
  emoji: string;

  @ManyToMany(() => UsersEntity, (users) => users.hobbies)
  users: UserMockEntity[];
}
