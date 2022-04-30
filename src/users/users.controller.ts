import { ApiPaginatedResponse } from 'src/common/decorators';
import { PageDto, PageOptionsDto } from 'src/common/dtos';

import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserDto } from './dtos';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({summary: 'Get all users'})
  @ApiPaginatedResponse(UserDto)
  getAllUsers(@Query() params: PageOptionsDto): Promise<PageDto<UserDto>> {
    return this.usersService.getAllUsers(params);
  }

  @Get('/steam')
  @ApiOperation({summary: 'Get steam users'})
  @ApiPaginatedResponse(UserDto)
  getSteamUsers(@Query() params: PageOptionsDto): Promise<PageDto<UserDto>> {
    return this.usersService.getSteamUsers(params);
  }
}
