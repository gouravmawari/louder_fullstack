import {IsNotEmpty, IsString} from "@nestjs/class-validator"
export class SearchEventDto {
    @IsString()
    @IsNotEmpty()
    query: string;
}