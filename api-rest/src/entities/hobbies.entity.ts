import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'hobbies',
})
export class HobbiesEntity {
  @PrimaryGeneratedColumn('uuid')
  hobbieId: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'text',
    // default: 'url',
  })
  imgUrl: string;
}
