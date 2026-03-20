import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  query: string;

  @Prop({ required: true })
  venueName: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  cost: string;

  @Prop({ required: true })
  why: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);