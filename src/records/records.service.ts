import { PageDto } from 'src/common/dtos';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { MapsService } from 'src/maps/maps.service';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RecordDto, RecordsPageOptionsDto } from './dtos';
import { Records } from './entities';
import { Weapons } from './enums';
import { GetRecordsOptions } from './interfaces';

type RecordType = RecordsPageOptionsDto['type'];
type RecordMapper<T> = { [Property in RecordType]: T };

@Injectable()
export class RecordsService {
  constructor(
    private mapsService: MapsService,
    @InjectRepository(Records)
    private recordsRepository: Repository<Records>,
  ) {}

  async getRecords(params: RecordsPageOptionsDto): Promise<PageDto<RecordDto>> {
    const map = await this.mapsService.getMapByName(params.mapName);
    if (!map) return this.emptyResults(params);

    const resolver: RecordMapper<() => Promise<PageDto<RecordDto>>> = {
      pro: () =>
        this.getProRecords(params, { includePlayer: true, mapId: map.id }),
      nub: () =>
        this.getNubRecords(params, { includePlayer: true, mapId: map.id }),
    };

    return await resolver[params.type]();
  }

  private async getProRecords(
    params: RecordsPageOptionsDto,
    options: GetRecordsOptions,
  ): Promise<PageDto<RecordDto>> {
    // Prepare query
    const queryBuilder = this.recordsRepository
      .createQueryBuilder('rec')
      .where('rec.teleportsCount = 0')
      .andWhere('rec.weapon = :weaponId', { weaponId: params.weapon })
      .andWhere('rec.airAccelerate = 0');

    if (options.mapId !== undefined) {
      queryBuilder.andWhere('rec.mapId = :mapId', { mapId: options.mapId });
    }
    if (options.userId !== undefined) {
      queryBuilder.andWhere('rec.userId = :userId', { userId: options.userId });
    }

    if (options.includeMap) this.queryWithMap(queryBuilder);
    if (options.includePlayer) this.queryWithPlayer(queryBuilder);

    // Add pagination
    this.queryWithPagination(queryBuilder, params);

    // Sort records by time
    queryBuilder.orderBy('rec.time', 'ASC');

    return await this.generateResponse(queryBuilder, params, options);
  }

  private async getNubRecords(
    params: RecordsPageOptionsDto,
    options: GetRecordsOptions,
  ): Promise<PageDto<RecordDto>> {
    // Prepare query
    const queryBuilder = this.recordsRepository
      .createQueryBuilder('rec')
      .where('rec.teleportsCount != 0')
      .andWhere('rec.weapon = :weaponId', { weaponId: params.weapon })
      .andWhere('rec.airAccelerate = 0');

    if (options.mapId !== undefined) {
      queryBuilder.andWhere('rec.mapId = :mapId', { mapId: options.mapId });
    }
    if (options.userId !== undefined) {
      queryBuilder.andWhere('rec.userId = :userId', { userId: options.userId });
    }

    if (options.includeMap) this.queryWithMap(queryBuilder);
    if (options.includePlayer) this.queryWithPlayer(queryBuilder);

    // Add pagination
    this.queryWithPagination(queryBuilder, params);

    // Sort records by time
    queryBuilder.orderBy('rec.time', 'ASC');

    return await this.generateResponse(queryBuilder, params, options);
  }

  private emptyResults(pageOptionsDto: PageOptionsDto) {
    return new PageDto([], new PageMetaDto({ itemCount: 0, pageOptionsDto }));
  }

  private queryWithMap<T>(queryBuilder: SelectQueryBuilder<T>) {
    queryBuilder.leftJoinAndSelect('rec.map', 'map');
  }

  private queryWithPlayer<T>(queryBuilder: SelectQueryBuilder<T>) {
    queryBuilder.leftJoinAndSelect('rec.player', 'player');
  }

  private queryWithPagination<T>(
    queryBuilder: SelectQueryBuilder<T>,
    params: PageOptionsDto,
  ) {
    queryBuilder.skip(params.skip).take(params.take);
  }

  private async generateResponse<T extends Records>(
    queryBuilder: SelectQueryBuilder<T>,
    params: RecordsPageOptionsDto,
    options: GetRecordsOptions,
  ) {
    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: params });

    return new PageDto(
      entities.map((entity) => new RecordDto(entity, options)),
      pageMetaDto,
    );
  }
}
