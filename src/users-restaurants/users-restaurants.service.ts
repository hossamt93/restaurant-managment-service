import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Restaurant, User, UsersRestaurants } from '../schemas';
import { FollowRestaurantDto, RestaurantDto, UserDto } from 'src/dtos';

@Injectable()
export class UsersRestaurantsService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<Restaurant>,
    @InjectModel(UsersRestaurants.name)
    private readonly usersRestaurants: Model<UsersRestaurants>,
  ) {}

  async findUsersAndRestaurantsBySharedCuisine(
    userId: string,
  ): Promise<{ users: UserDto[]; restaurants: RestaurantDto[] }> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const aggregateQuery = await this.userModel.aggregate([
      {
        $match: { _id: new Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: 'users',
          let: { favoriteCuisine: '$favoriteCuisine' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$$favoriteCuisine', '$favoriteCuisine'] },
              },
            },
          ],
          as: 'usersWithSameCuisine',
        },
      },
      {
        $lookup: {
          from: 'usersrestaurants',
          localField: 'usersWithSameCuisine._id',
          foreignField: 'userId',
          as: 'followedRestaurants',
        },
      },
      {
        $lookup: {
          from: 'restaurants',
          localField: 'followedRestaurants.restaurantId',
          foreignField: '_id',
          as: 'restaurants',
        },
      },
      {
        $project: {
          usersWithSameCuisine: 1,
          restaurants: 1,
        },
      },
    ]);

    return {
      users: aggregateQuery[0].usersWithSameCuisine,
      restaurants: aggregateQuery[0].restaurants,
    };
  }

  async followRestaurant(dto: FollowRestaurantDto) {
    const { userId, restaurantId } = dto;

    return await this.usersRestaurants.create({
      restaurantId,
      userId,
    });
  }
}
