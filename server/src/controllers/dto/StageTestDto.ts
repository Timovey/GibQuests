import { Expose, Type } from "class-transformer";
import { IsDefined, Matches, IsOptional } from "class-validator";
import { QuestionDto } from './QuestionDto';

export class StageTestDto {
    id: number

    @IsDefined()
    @Expose()
    title: string;

    @Type(() => QuestionDto)
    questions: QuestionDto[];
}