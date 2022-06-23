import { Expose, } from "class-transformer";
import { IsDefined, Matches, IsOptional } from "class-validator";

export class AuthorDto {
    id: number

    name: string;

    surname: string;

    @IsDefined()
    @Expose()
    username: string;

    password: string;
}