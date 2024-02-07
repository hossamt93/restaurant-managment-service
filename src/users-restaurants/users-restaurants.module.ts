import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Restaurant,
  User,
  UsersRestaurants,
  restaurantSchema,
  userSchema,
  usersRestaurantsSchema,
} from '../schemas';
import { UsersRestaurantsController } from './users-restaurants.controller';
import { UsersRestaurantsService } from './users-restaurants.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: userSchema },
      { name: Restaurant.name, schema: restaurantSchema },
      { name: UsersRestaurants.name, schema: usersRestaurantsSchema },
    ]),
  ],
  controllers: [UsersRestaurantsController],
  providers: [UsersRestaurantsService],
})
export class UsersRestaurantsModule {}
