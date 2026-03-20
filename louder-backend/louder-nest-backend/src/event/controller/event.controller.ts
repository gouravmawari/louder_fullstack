import { Controller, Post, Get, Body, Headers } from '@nestjs/common';
import { EventService } from '../service/event.service';
import { SearchEventDto } from '../dto/search-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('search')
  async search(
    @Body() body: SearchEventDto,
    @Headers('x-user-id') userId: string
  ) {
    return this.eventService.search(body.query, userId);
  }

  @Get('history')
  async history(@Headers('x-user-id') userId: string) {
    return this.eventService.getHistory(userId);
  }
}