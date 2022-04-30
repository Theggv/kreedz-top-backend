import { PageDto } from 'src/common/dtos';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { MapsService } from 'src/maps/maps.service';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RecordDto, RecordsPageOptionsDto } from './dtos';
import { NubRecords, ProRecords, WeaponsRecords } from './entities';

@Injectable()
export class RecordsService {
  constructor(
    private mapsService: MapsService,
    @InjectRepository(ProRecords)
    private prorecordsRepository: Repository<ProRecords>,
    @InjectRepository(NubRecords)
    private nubrecordsRepository: Repository<NubRecords>,
    @InjectRepository(WeaponsRecords)
    private wpnrecordsRepository: Repository<WeaponsRecords>,
  ) {}

  async getProRecords(
    params: RecordsPageOptionsDto,
  ): Promise<PageDto<RecordDto>> {
    const map = await this.mapsService.getMapByName(params.mapName);
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

    return new PageDto(
      entities.map((entity) => new RecordDto(entity, { includePlayer: true })),
      pageMetaDto,
    );
  }

  async getNubRecords(
    params: RecordsPageOptionsDto,
  ): Promise<PageDto<RecordDto>> {
    const map = await this.mapsService.getMapByName(params.mapName);
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

    return new PageDto(
      entities.map((entity) => new RecordDto(entity, { includePlayer: true })),
      pageMetaDto,
    );
  }

  async getRecordsWithWeapons(
    params: RecordsPageOptionsDto,
  ): Promise<PageDto<RecordDto>> {
    const map = await this.mapsService.getMapByName(params.mapName);
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

    return new PageDto(
      entities.map((entity) => new RecordDto(entity, { includePlayer: true })),
      pageMetaDto,
    );
  }

  private emptyResults(pageOptionsDto: PageOptionsDto) {
    return new PageDto([], new PageMetaDto({ itemCount: 0, pageOptionsDto }));
  }
}
