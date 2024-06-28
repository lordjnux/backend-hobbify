import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FeaturesEntity {
  @PrimaryGeneratedColumn('uuid')
  featureId: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;
}
