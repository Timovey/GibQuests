import { Expose, Type} from "class-transformer";
import { IsDefined, Matches, IsOptional, IsHash } from "class-validator";

export class UserDto {
    id: number
    @Expose()
    name: string;

    @Expose()
    surname: string;

    @IsDefined()
    @Expose()
    username: string;

    @IsDefined()
    @Expose()
    password: string;

    @Expose()
    token: string

}