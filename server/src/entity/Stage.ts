import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm"
import {Quest} from './Quest';
import {Stage_Action} from './Stage_Action';
import {Stage_Test} from './Stage_Test';


export type StageEnum = 'Видео' | 'Текст'| 'Карта' | 'Тест' | 'QR'
export const StageEnumArray = ['Видео', 'Текст', 'Карта', 'Тест', 'QR']
@Entity()
export class Stage {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false
    })
    number: number

    @Column({
        type: "enum",
        enum: StageEnumArray,
        default: 'Текст',
        nullable: false
    })
    type: StageEnum

    @Column({
        length:50,
        nullable: false
    })
    name: string

    @ManyToOne(() => Quest, (quest) => quest.stages, {onDelete: "CASCADE"})
    quest: Quest


    @OneToOne(() => Stage_Action, (stageAction) => stageAction.stage)
    stageAction: Stage_Action

    @OneToOne(() => Stage_Test, (stageTest) => stageTest.stage)
    stageTest: Stage_Test
}
