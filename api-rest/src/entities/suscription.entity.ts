import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FeaturesEntity } from './features.entity';
import { features } from 'process';

@Entity()
export class SuscriptionEntity {
  @PrimaryGeneratedColumn('uuid')
  suscriptionId: string;

  @Column()
  plan: string;

  @Column()
  price: number;

  @Column()
  duration: number;

  @OneToOne(() => FeaturesEntity, (features) => features.featureId)
  @JoinColumn({
    name: 'featureId',
  })
  featureId: FeaturesEntity;
}