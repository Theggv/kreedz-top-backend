import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MapDto } from './dto/map.dto';
import { PlayerDto } from './dto/player.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { RecordDto } from './dto/record.dto';
import { RecordsPageDto } from './dto/records-page.dto';
import { Maps } from './entity/maps.entity';
import { NubRecords } from './entity/nubrecords.entity';
import { Players } from './entity/players.entity';
import { ProRecords } from './entity/prorecords.entity';
import { RecordsWithWeapons } from './entity/records-with-wpn.entity';

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

  async getProRecords(params: QueryParamsDto): Promise<RecordsPageDto> {
    const map = await this.findMap(params.mapName);
    if (!map) return this.emptyResults(params);

    const queryBuilder = this.prorecordsRepository.createQueryBuilder('rec');

    queryBuilder
      .where('rec.mapId = :id', { id: map.id })
      .orderBy('rec.time', 'ASC')
      .skip(params.skip)
      .take(params.take)
      .leftJoinAndSelect('rec.player', 'player');

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: params });

    return new RecordsPageDto(
      entities.map((entity) => new RecordDto(entity, { includePlayer: true })),
      pageMetaDto,
    );
  }

  async getNubRecords(params: QueryParamsDto): Promise<RecordsPageDto> {
    const map = await this.findMap(params.mapName);
    if (!map) return this.emptyResults(params);

    const queryBuilder = this.nubrecordsRepository.createQueryBuilder('rec');

    queryBuilder
      .where('rec.mapId = :id', { id: map.id })
      .orderBy('rec.time', 'ASC')
      .skip(params.skip)
      .take(params.take)
      .leftJoinAndSelect('rec.player', 'player');

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: params });

    return new RecordsPageDto(
      entities.map((entity) => new RecordDto(entity, { includePlayer: true })),
      pageMetaDto,
    );
  }

  async getRecordsWithWeapons(params: QueryParamsDto): Promise<RecordsPageDto> {
    const map = await this.findMap(params.mapName);
    if (!map) return this.emptyResults(params);

    const queryBuilder = this.wpnrecordsRepository.createQueryBuilder('rec');

    queryBuilder
      .where('rec.mapId = :id ', { id: map.id })
      .andWhere('rec.weapon = :weapon', { weapon: params.weapon })
      .orderBy('rec.time', 'ASC')
      .skip(params.skip)
      .take(params.take)
      .leftJoinAndSelect('rec.player', 'player');

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: params });

    return new RecordsPageDto(
      entities.map((entity) => new RecordDto(entity, { includePlayer: true })),
      pageMetaDto,
    );
  }

  private emptyResults(pageOptionsDto: PageOptionsDto) {
    return new RecordsPageDto(
      [],
      new PageMetaDto({ itemCount: 0, pageOptionsDto }),
    );
  }

  private async findMap(name: string) {
    return await this.mapsRepository.findOne({ where: { name } });
  }
}
