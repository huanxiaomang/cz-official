import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty()
  intro: string;

  @IsString()
  @IsNotEmpty()
  detail: string;

  @IsString()
  @IsNotEmpty()
  sdate: string;

  @IsString()
  @IsNotEmpty()
  edate: string;

  @IsString()
  @IsNotEmpty()
  joiners: string;

  @IsNumber()
  @IsNotEmpty()
  status: number;
}
