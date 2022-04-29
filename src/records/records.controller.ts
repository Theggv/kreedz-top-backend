import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { RecordsService } from './records.service';

@Controller('records')
export class RecordsController {
  constructor(private recordsService: RecordsService) {}

  @Get('/players')
  getAllPlayers() {
    return this.recordsService.getAllPlayers();
  }

  @Get('/maps')
  getAllMaps() {
    return this.recordsService.getAllMaps();
  }

  @Get('/pro/:mapName')
  getProRecordsForMap(@Param('mapName') mapName: string) {
    return this.recordsService.getProRecords(mapName);
  }

  @Get('/nub/:mapName')
  getNubRecordsForMap(@Param('mapName') mapName: string) {
    return this.recordsService.getNubRecords(mapName);
  }

  @Get('/weapons/:mapName/:weaponId')
  getWeaponRecordsForMapSpecific(
    @Param('mapName') mapName: string,
    @Param('weaponId', ParseIntPipe) weaponId: number,
  ) {
    return this.recordsService.getRecordsWithWeapons(mapName, weaponId);
  }
  
  @Get('/weapons/:mapName')
  getWeaponRecordsForMap(
    @Param('mapName') mapName: string,
  ) {
    return this.recordsService.getRecordsWithWeapons(mapName);
  }

}
