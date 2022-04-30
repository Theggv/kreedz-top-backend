import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { PageOptionsDto } from 'src/common/dtos';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class MapsPageOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional({
    minimum: 10,
    maximum: 100,
    default: 100,
  })
  @Type(() => Number)
  @IsInt()
  @Min(10)
  @Max(100)
  @IsOptional()
  readonly take?: number = 100;

  @ApiPropertyOptional({ description: 'Partial name of the map' })
  @IsString()
  @Length(2)
  @IsOptional()
  readonly search?: string;
}
