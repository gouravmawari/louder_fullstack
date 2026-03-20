import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventController } from './controller/event.controller';
import { EventService } from './service/event.service';
import { Event, EventSchema } from './schema/event.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }])
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}