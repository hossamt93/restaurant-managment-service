import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersRestaurantsModule } from './users-restaurants/users-restaurants.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI, { dbName: process.env.DB_NAME }),
    UserModule,
    RestaurantModule,
    UsersRestaurantsModule,
  ],
})
export class AppModule {}
