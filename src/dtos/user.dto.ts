import { IsEnum, IsString } from 'class-validator';
import { RestaurantCuisines } from '../utils/enums';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty({ enum: RestaurantCuisines })
  @IsEnum(RestaurantCuisines)
  favoriteCuisine: RestaurantCuisines;
}
