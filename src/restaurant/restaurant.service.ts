import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RestaurantDto } from '../dtos';
import { Restaurant, restaurantDocument } from '../schemas';
import { RestaurantCuisines } from '../utils/enums';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<Restaurant>,
  ) {}

  async getAll(cuisine?: RestaurantCuisines): Promise<RestaurantDto[]> {
    const restaurants = await this.restaurantModel.find({
      cuisine,
    });
    return restaurants.map(this.mapToDto);
  }

  async getByIdOrUniqueName(
    id?: string,
    uniqueName?: string,
  ): Promise<RestaurantDto> {
    const restaurant = await this.restaurantModel
      .findOne({ $or: [{ _id: id }, { uniqueName }] })
      .exec();

    if (!restaurant) {
      throw new NotFoundException('restaurant not found');
    }

    return this.mapToDto(restaurant);
  }

  async create(dto: RestaurantDto): Promise<RestaurantDto> {
    try {
      const newRestaurant = new this.restaurantModel(dto);
      await newRestaurant.save();
      return this.mapToDto(newRestaurant);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByLocation(
    longitude: number,
    latitude: number,
    maxDistance: number,
  ): Promise<RestaurantDto[]> {
    const restaurants = await this.restaurantModel
      .find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            $maxDistance: maxDistance, // in meters
          },
        },
      })
      .exec();

    return restaurants.map(this.mapToDto);
  }

  private mapToDto(restaurant: restaurantDocument): RestaurantDto {
    return {
      id: restaurant._id.toString(),
      name: restaurant.name,
      uniqueName: restaurant.uniqueName,
      location: restaurant.location,
      cuisine: restaurant.cuisine,
    };
  }
}
