import { Records } from 'src/records/entities';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'kz_maps' })
export class Maps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true, type: 'varchar', name: 'mapname' })
  name: string;

  @OneToMany(() => Records, (record) => record.map)
  @JoinColumn({ name: 'id' })
  records: Records[];
}
