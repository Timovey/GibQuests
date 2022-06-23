import { Expose, Type } from "class-transformer";
import { IsDefined, Matches, IsOptional } from "class-validator";
import { AuthorDto } from "./AuthorDto";
import { StageDto } from "./StageDto";


export class QuestDto {

    id: number
    
    @IsDefined()
    @Expose()
    title: string;

    @IsDefined()
    @Expose()
    description: string;

    @Type(() => AuthorDto)
    author: AuthorDto;

    @Type(() => StageDto)
    stages: StageDto[];
}