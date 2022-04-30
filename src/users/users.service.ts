import { PageDto, PageMetaDto, PageOptionsDto } from 'src/common/dtos';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserDto } from './dtos';
import { Users } from './entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async getAllUsers(params: PageOptionsDto): Promise<PageDto<UserDto>> {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');

    // prepare query
    queryBuilder.orderBy('user.id', 'ASC').skip(params.skip).take(params.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: params });

    return new PageDto(
      entities.map((entity) => new UserDto(entity)),
      pageMetaDto,
    );
  }

  async getSteamUsers(params: PageOptionsDto): Promise<PageDto<UserDto>> {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');

    // prepare query
    queryBuilder
      .where("user.steamId LIKE 'STEAM_0:%'")
      .orderBy('user.id', 'ASC')
      .skip(params.skip)
      .take(params.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: params });

    return new PageDto(
      entities.map((entity) => new UserDto(entity)),
      pageMetaDto,
    );
  }
}
