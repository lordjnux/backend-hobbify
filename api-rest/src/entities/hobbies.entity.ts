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
<<<<<<< HEAD
    type: 'varchar',
  })
  emoji: string;
=======
    type: 'text',
  })
  emoji: string;

  @ManyToMany(() => UsersEntity, (users) => users.hobbies)
  orderDetails: UserMockEntity[];
>>>>>>> 7e501cd2e5886239fe2a280b12ece4cf5c88c5b5
}
