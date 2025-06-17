import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  limit: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  offset: number;
}
