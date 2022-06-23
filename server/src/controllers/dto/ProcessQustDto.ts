import { Expose, Type } from "class-transformer";
import { IsDefined, Matches, IsOptional } from "class-validator";

export class ProcessQustDto {

    @IsDefined()
    @Expose()
    userId: number;

    @IsDefined()
    @Expose()
    questId: number;

    @Expose()
    progress: number;

}