import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsEnum, IsString, ValidateNested } from 'class-validator';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { RestaurantCuisines } from '../utils/enums';

class RestaurantName {
  @Prop()
  @IsString()
  en: string;

  @Prop()
  @IsString()
  ar: string;
}

class RestaurantLocation {
  @Prop({ default: 'Point' })
  type: string;
  @Prop({ type: Array, required: true })
  coordinates: [number, number]; //tuple of coordinates [lat , long]
}

@Schema({ versionKey: false, timestamps: true })
export class Restaurant {
  @Prop({ type: RestaurantName, required: true })
  @ValidateNested()
  @Type(() => RestaurantName)
  name: RestaurantName;

  @Prop({ unique: true })
  uniqueName: string;

  @Prop({ type: String, enum: RestaurantCuisines, required: true })
  @IsEnum(RestaurantCuisines)
  cuisine: RestaurantCuisines;

  @Prop({
    type: RestaurantLocation,
    coordinates: [Number],
    index: '2dsphere',
    required: true,
  })
  @ValidateNested()
  @Type(() => RestaurantLocation)
  location: RestaurantLocation;

  @Prop({
    type: [{ type: SchemaTypes.ObjectId, ref: 'User' }],
  })
  followers: string[];
}

export const restaurantSchema = SchemaFactory.createForClass(Restaurant);
export type restaurantDocument = HydratedDocument<Restaurant>;
