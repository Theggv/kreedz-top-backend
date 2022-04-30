import { ApiPaginatedResponse } from 'src/common/decorators';
import { PageDto, PageOptionsDto } from 'src/common/dtos';

import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserDto } from './dtos';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiPaginatedResponse(UserDto)
  getAllUsers(@Query() params: PageOptionsDto): Promise<PageDto<UserDto>> {
    return this.usersService.getAllUsers(params);
  }

  @Get('/steam')
  @ApiPaginatedResponse(UserDto)
  getSteamUsers(@Query() params: PageOptionsDto): Promise<PageDto<UserDto>> {
    return this.usersService.getSteamUsers(params);
  }
}
