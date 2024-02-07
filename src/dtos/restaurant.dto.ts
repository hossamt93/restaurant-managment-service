import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { RestaurantCuisines } from '../utils/enums';
import { ApiProperty } from '@nestjs/swagger';

class RestaurantNameDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  en: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ar: string;
}

class RestaurantLocationDto {
  @ApiProperty({ default: 'Point' })
  @IsString()
  type: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  coordinates: [number, number]; //tuple of coordinates [lat , long]
}

export class RestaurantDto {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => RestaurantNameDto)
  name: RestaurantNameDto;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  uniqueName: string;

  @ApiProperty({ enum: RestaurantCuisines })
  @IsNotEmpty()
  @IsEnum(RestaurantCuisines)
  cuisine: RestaurantCuisines;

  @ApiProperty()
  @ValidateNested()
  @Type(() => RestaurantLocationDto)
  @IsNotEmpty()
  location: RestaurantLocationDto;
}
