import { NubRecords, ProRecords, WeaponsRecords } from 'src/records/entities';
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

  @OneToMany(() => ProRecords, (record) => record.map)
  @JoinColumn({ name: 'id' })
  proRecords: ProRecords[];

  @OneToMany(() => NubRecords, (record) => record.map)
  @JoinColumn({ name: 'id' })
  nubRecords: NubRecords[];

  @OneToMany(() => WeaponsRecords, (record) => record.map)
  @JoinColumn({ name: 'id' })
  weaponRecords: WeaponsRecords[];
}
