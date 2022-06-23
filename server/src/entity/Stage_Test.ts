import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany,JoinColumn } from "typeorm"
import {Stage} from './Stage';
import { Question } from './Question';

@Entity()
export class Stage_Test {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 50,
        nullable: false
    })
    title: string

    @OneToOne(() => Stage, (stage) => stage.stageTest, {onDelete: "CASCADE"})
    @JoinColumn()
    stage: Stage

    @OneToMany(() => Question, (question) => question.stageTest, {cascade: true})
    questions: Question[]

}
