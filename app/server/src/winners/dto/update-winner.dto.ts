import { PartialType } from '@nestjs/mapped-types';
import { CreateWinnerDto } from './create-winner.dto';

export class UpdateWinnerDto extends PartialType(CreateWinnerDto) {} 