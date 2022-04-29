import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { QueryParamsDto } from './dto/query-params.dto';

@Injectable()
export class TransformPipe implements PipeTransform<QueryParamsDto> {
  transform(value: QueryParamsDto, metadata: ArgumentMetadata) {
    value.mapName = value.mapName.toLowerCase();

    return value;
  }
}
