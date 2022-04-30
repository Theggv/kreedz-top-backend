import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { RecordsPageOptionsDto } from './dtos';

@Injectable()
export class TransformPipe implements PipeTransform<RecordsPageOptionsDto> {
  transform(value: RecordsPageOptionsDto, metadata: ArgumentMetadata) {
    value.mapName = value.mapName.toLowerCase();

    return value;
  }
}
