import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Event, EventDocument } from '../schema/event.schema';

@Injectable()
export class EventService {
  private genAI: GoogleGenerativeAI;

  constructor(
    private configService: ConfigService,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>
  ) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined in .env');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

    async search(query: string, userId: string) {
    const model = this.genAI.getGenerativeModel({ model: 'models/gemini-2.5-flash' });

    const prompt = `
        You are an event planning assistant.
        Based on this event description: "${query}"
        
        Return ONLY a raw JSON object, no markdown, no backticks, no explanation.
        Just the JSON object starting with { and ending with }
        
        Required fields:
        - name: venue name
        - location: city and region
        - cost: estimated cost
        - why: why this venue fits the request
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    const cleaned = text
        .replace(/```json|```/g, '')
        .replace(/^\s+|\s+$/g, '')
        .trim();

    let json;
    try {
        json = JSON.parse(cleaned);
    } catch (e) {
        throw new Error('AI returned invalid response, please try again');
    }

    if (!json.name || !json.location || !json.cost || !json.why) {
        throw new Error('AI response missing required fields');
    }

    await this.eventModel.create({
        userId,
        query,
        venueName: json.name,
        location: json.location,
        cost: json.cost,
        why: json.why
    });

    return json;
    }

  async getHistory(userId: string) {
  return this.eventModel
    .find({ userId })
    .sort({ createdAt: -1 })  
    .exec();
}
}