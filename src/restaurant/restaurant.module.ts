import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, User, restaurantSchema, userSchema } from '../schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: restaurantSchema },
      { name: User.name, schema: userSchema },
    ]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
