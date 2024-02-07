import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Restaurant } from './restaurant.schema';
import { User } from './user.schema';

@Schema({ versionKey: false, timestamps: true })
export class UsersRestaurants {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  userId: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: Restaurant.name, required: true })
  restaurantId: string;
}

export const usersRestaurantsSchema =
  SchemaFactory.createForClass(UsersRestaurants);
export type usersRestaurantsDocument = HydratedDocument<UsersRestaurants>;
