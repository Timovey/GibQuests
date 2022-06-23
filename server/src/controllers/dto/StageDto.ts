import { Expose, Type } from "class-transformer";
import { IsDefined, Matches, IsOptional } from "class-validator";
import {StageActionDto, StageActionMapDto, StageActionMediaDto, StageActionQrDto, StageActionTextDto} from './StageActionDto';
import { StageTestDto } from './StageTestDto';
import {StageEnum} from '../../entity/Stage';
export class StageDto {
    id: number
    
    @IsDefined()
    @Expose()
    number: number;

    @IsDefined()
    @Expose()
    type: StageEnum;

    @IsDefined()
    @Expose()
    name: string;

    @Type(() => StageActionDto, {
            discriminator: {
            property: '__type',
            subTypes: [
                { value: StageActionMapDto, name: 'map' },
                { value: StageActionMediaDto, name: 'media' },
                { value: StageActionQrDto, name: 'qr' },
                { value: StageActionTextDto, name: 'text' },
            ],
            },
        })
    action: StageActionMapDto | StageActionMediaDto | StageActionQrDto | StageActionTextDto;

    @Type(() => StageTestDto)
    test: StageTestDto;
}
