import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateActivityDto {
  @IsString()
  @IsOptional()
  intro?: string;

  @IsString()
  @IsOptional()
  detail?: string;

  @IsString()
  @IsOptional()
  sdate?: string;

  @IsString()
  @IsOptional()
  edate?: string;

  @IsString()
  @IsOptional()
  joiners?: string;

  @IsNumber()
  @IsOptional()
  status?: number;
}
