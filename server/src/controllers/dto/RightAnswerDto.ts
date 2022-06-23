import { Expose, Type } from "class-transformer";
import { IsDefined, Matches, IsOptional } from "class-validator";


export abstract class RightAnswerDto {
    id: number

    @IsDefined()
    @Expose()
    value: string;

}
 