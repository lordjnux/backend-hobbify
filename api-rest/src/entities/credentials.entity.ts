import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from './users.entity';

@Entity({
  name: 'credentials',
})
export class CredentialsEntity {
  @PrimaryGeneratedColumn('uuid')
  credentialId: string;

  @Column({
    type: 'varchar',
    length: 60,
    nullable: false,
  })
  password: string;

  @OneToOne(() => UsersEntity, (user) => user.email)
  email: UsersEntity;
}
