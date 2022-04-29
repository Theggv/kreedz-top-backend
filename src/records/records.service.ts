import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { NubRecordDto } from './dto/nubrecord.dto';
import { ProRecordDto } from './dto/prorecord.dto';
import { WeaponRecordDto } from './dto/weaponrecord.dto';
import { Maps } from './entity/maps.entity';
import { NubRecords } from './entity/nubrecords.entity';
import { Players } from './entity/players.entity';
import { ProRecords } from './entity/prorecords.entity';
import { RecordsWithWeapons } from './entity/records-with-wpn.entity';
import { MapDto } from './dto/map.dto';
import { PlayerDto } from './dto/player.dto';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Players) private playersRepository: Repository<Players>,
    @InjectRepository(Maps) private mapsRepository: Repository<Maps>,
    @InjectRepository(ProRecords)
    private prorecordsRepository: Repository<ProRecords>,
    @InjectRepository(NubRecords)
    private nubrecordsRepository: Repository<NubRecords>,
    @InjectRepository(RecordsWithWeapons)
    private wpnrecordsRepository: Repository<RecordsWithWeapons>,
  ) {}

  async getAllPlayers() {
    const players = await this.playersRepository.find();

    return players.map((x) => new PlayerDto(x));
  }

  async getAllMaps() {
    const maps = await this.mapsRepository.find();

    return maps.map((x) => new MapDto(x));
  }

  async getProRecords(mapName: string) {
    const map = await this.mapsRepository.findOne({ where: { name: mapName } });

    const records = await this.prorecordsRepository.find({
      where: { mapId: map.id },
      relations: ['player'],
      order: { time: 'ASC' },
    });

    return records.map(
      (record) => new ProRecordDto(record, { includePlayer: true }),
    );
  }

  async getNubRecords(mapName: string) {
    const map = await this.mapsRepository.findOne({ where: { name: mapName } });

    const records = await this.nubrecordsRepository.find({
      where: { mapId: map.id },
      relations: ['player'],
      order: { time: 'ASC' },
    });

    return records.map(
      (record) => new NubRecordDto(record, { includePlayer: true }),
    );
  }

  async getRecordsWithWeapons(mapName: string, weapon?: number) {
    const map = await this.mapsRepository.findOne({ where: { name: mapName } });

    const records = await this.wpnrecordsRepository.find({
      where: [
        weapon !== undefined ? { mapId: map.id, weapon } : { mapId: map.id },
      ],
      relations: ['player'],
      order: { time: 'ASC' },
    });

    return records.map(
      (record) => new WeaponRecordDto(record, { includePlayer: true }),
    );
  }
}
