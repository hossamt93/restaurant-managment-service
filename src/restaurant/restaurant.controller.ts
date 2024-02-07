import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantCuisines } from '../utils/enums';
import { RestaurantDto } from '../dtos';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('restaurant')
@ApiTags('Restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  @ApiQuery({ name: 'cuisine', enum: RestaurantCuisines })
  async getAll(
    @Query('cuisine') cuisine?: RestaurantCuisines,
  ): Promise<RestaurantDto[]> {
    return await this.restaurantService.getAll(cuisine);
  }

  @Get('getByIdOrUniqueName')
  @ApiQuery({ name: 'id', required: false })
  @ApiQuery({ name: 'uniqueName', required: false })
  async getByIdOrUniqueName(
    @Query('id') id?: string,
    @Query('uniqueName') uniqueName?: string,
  ): Promise<RestaurantDto> {
    return await this.restaurantService.getByIdOrUniqueName(id, uniqueName);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: RestaurantDto): Promise<RestaurantDto> {
    return this.restaurantService.create(dto);
  }

  @Get('nearby')
  @ApiQuery({ name: 'maxDistance', required: false })
  @ApiQuery({ name: 'longitude', type: Number })
  @ApiQuery({ name: 'latitude', type: Number })
  async findNearby(
    @Query('longitude') longitude: number,
    @Query('latitude') latitude: number,
    @Query('maxDistance') maxDistance: number = 1000,
  ): Promise<RestaurantDto[]> {
    return this.restaurantService.findByLocation(
      +longitude,
      +latitude,
      maxDistance,
    );
  }
}
