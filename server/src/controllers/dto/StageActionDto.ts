import { Expose, Type } from "class-transformer";
import { IsDefined, Matches, IsOptional } from "class-validator";


export class StageActionDto {
    id: number
}
  
export class StageActionMapDto extends StageActionDto {
    lat: number;
    long: number;
}

export class StageActionMediaDto extends StageActionDto {
    url: string;
}

export class StageActionQrDto extends StageActionDto {
    to: string;
}
export class StageActionTextDto extends StageActionDto {
    text: string;
}
  
 