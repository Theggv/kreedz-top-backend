import { NubRecords, ProRecords, WeaponsRecords } from 'src/records/entities';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'kz_uid' })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'steam_id', nullable: false, unique: true })
  steamId: string;

  @Column({
    type: 'varchar',
    name: 'last_name',
    nullable: true,
    default: () => 'NULL',
  })
  lastName: string;

  @OneToMany(() => ProRecords, (record) => record.player)
  @JoinColumn({ name: 'id' })
  proRecords: ProRecords[];

  @OneToMany(() => NubRecords, (record) => record.player)
  @JoinColumn({ name: 'id' })
  nubRecords: NubRecords[];

  @OneToMany(() => WeaponsRecords, (record) => record.player)
  @JoinColumn({ name: 'id' })
  weaponRecords: WeaponsRecords[];
}
