import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum, IsString } from 'class-validator';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { RestaurantCuisines } from '../utils/enums';

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop({ type: String, required: true })
  @IsString()
  fullName: string;

  @Prop({ type: String, enum: RestaurantCuisines, required: true })
  @IsEnum(RestaurantCuisines)
  favoriteCuisine: RestaurantCuisines;

  @Prop({
    type: [{ type: SchemaTypes.ObjectId, ref: 'Restaurant' }],
  })
  restaurants: string[];
}

export const userSchema = SchemaFactory.createForClass(User);
export type userDocument = HydratedDocument<User>;
