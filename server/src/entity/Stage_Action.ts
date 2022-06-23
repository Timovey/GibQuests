import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import {Stage} from './Stage';

@Entity()
export class Stage_Action {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "text",
        nullable: true
    })
    url: string

    @Column({
        type: "float",
        nullable: true
    })
    lat: number

    @Column({
        type: "float",
        nullable: true
    })
    long: number

    @Column({
        type: "text",
        nullable: true
    })
    to: string

    @Column({
        nullable: true
    })
    text: string

    @OneToOne(() => Stage, (stage) => stage.stageAction, {onDelete: "CASCADE"})
    @JoinColumn()
    stage: Stage

}
