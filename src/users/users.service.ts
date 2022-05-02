import { PageDto, PageMetaDto, PageOptionsDto } from 'src/common/dtos';
import * as SteamApi from 'steamapi';
import { Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { UserDto } from './dtos';
import { SteamUserDto } from './dtos/steam-user.dto';
import { Users } from './entities';
import { convertSteamIdToCommId, isSteamUser } from './utils';

@Injectable()
export class UsersService {
  private steamApi: SteamApi;

  constructor(
    private configService: ConfigService,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {
    this.steamApi = new SteamApi(this.configService.get('STEAM_API_KEY'));
  }

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

  async getUserById(id: number): Promise<SteamUserDto> {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');

    const user = await queryBuilder.where('user.id = :id', { id }).getOne();

    if (!user) {
      throw new NotFoundException({
        message: 'User with that id was not found',
      });
    }

    if (!isSteamUser(user.steamId)) {
      throw new BadRequestException({ message: 'Not steam user' });
    }

    const commId = convertSteamIdToCommId(user.steamId);
    const summary = await this.steamApi.getUserSummary(commId);

    return new SteamUserDto(user, summary);
  }
}
