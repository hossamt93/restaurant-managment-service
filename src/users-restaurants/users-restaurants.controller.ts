import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UsersRestaurantsService } from './users-restaurants.service';
import { FollowRestaurantDto, RestaurantDto, UserDto } from '../dtos';
import { ApiTags } from '@nestjs/swagger';

@Controller('users-restaurants')
@ApiTags('Users Restaurants')
export class UsersRestaurantsController {
  constructor(
    private readonly usersRestaurantsService: UsersRestaurantsService,
  ) {}

  @Get(':userId')
  async getUsersAndRestaurantsBySharedCuisine(
    @Param('userId') userId: string,
  ): Promise<{ users: UserDto[]; restaurants: RestaurantDto[] }> {
    return await this.usersRestaurantsService.findUsersAndRestaurantsBySharedCuisine(
      userId,
    );
  }

  @Post('follow')
  @HttpCode(HttpStatus.CREATED)
  async followRestaurant(@Body() dto: FollowRestaurantDto) {
    return this.usersRestaurantsService.followRestaurant(dto);
  }
}
