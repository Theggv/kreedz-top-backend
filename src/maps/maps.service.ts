import { PageDto, PageMetaDto } from 'src/common/dtos';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MapDto, MapsPageOptionsDto } from './dtos';
import { Maps } from './entities';

@Injectable()
export class MapsService {
  constructor(
    @InjectRepository(Maps) private mapsRepository: Repository<Maps>,
  ) {}

  async getMaps(params: MapsPageOptionsDto): Promise<PageDto<MapDto>> {
    const queryBuilder = this.mapsRepository.createQueryBuilder('map');

    const name = params.search ? `%${params.search}%` : '%';

    // prepare query
    queryBuilder
      .where('map.name LIKE :name', { name })
      .orderBy('map.name', 'ASC')
      .skip(params.skip)
      .take(params.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: params });

    return new PageDto(
      entities.map((entity) => new MapDto(entity)),
      pageMetaDto,
    );
  }

  async getMapByName(name: string): Promise<MapDto | null> {
    const queryBuilder = this.mapsRepository.createQueryBuilder('map');

    // prepare query
    queryBuilder.where('map.name = :name', { name });

    const entity = await queryBuilder.getOne();

    if (!entity) return null;

    return new MapDto(entity);
  }
}
