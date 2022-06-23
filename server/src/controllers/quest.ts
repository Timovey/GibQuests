import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { ArgumentError, NotFoundError } from "../error";
import { ok, error } from "./utils";
import { QuestDto,ProcessQustDto } from './dto';
import { QuestService } from "../service/quest";
import * as fs from 'fs';
import * as path from 'path';
import {getBaseUrl} from 'get-base-url';
import * as crypto from 'crypto';
import * as config from 'config';
interface MulterRequest extends Request {
    files: any;
}

export async function getQuest(request: Request, response: Response) {
    if (!request.query.id) {
        response.json(error('Введите query параметр id'))
        return;
    }

    const res = await QuestService.getQuest(+request.query.id)
    res ? response.json(ok(res)) : response.json(error('Не существует квеста с данным id'))  
}
export async function getQuests(request: Request, response: Response) {
    const res = await QuestService.getQuests()
    response.json(ok(res)) 
}
export async function getCreatedQuests(request: Request, response: Response) {
    if (!request.query.id) {
        response.json(error('Введите query параметр id, (id автора квеста)'))
        return;
    }

    const res = await QuestService.getCreatedQuests(+request.query.id)
    res ? response.json(ok(res)) : response.json(error('Не существует записей с таким автором'))  
}

export async function getCreatedQuest(request: Request, response: Response) {
    if (!request.query.id) {
        response.json(error('Введите query параметр id квеста'))
        return;
    }

    const res = await QuestService.getCreatedQuest(+request.query.id)
    res ? response.json(ok(res)) : response.json(error('Не существует записей с таким id квеста'))  
}

export async function create(request: Request, response: Response) {
    const quest = plainToClass(QuestDto, request.body);
    const errors = await validate(quest, { skipMissingProperties: true });
    if (errors.length) {
        throw new ArgumentError();
    }
    const res = await QuestService.add(quest.title, quest.description, quest.stages, quest.author.username)
    response.json(ok(res));
}

export async function deleteQuest(request: Request, response: Response) {
    if(!request.query.id) {
        response.json(error('Введите query параметр id квеста'))
    }
    try {   
        const res = await QuestService.deleteQuest(+request.query.id)
        response.json(ok(res));
    }
    catch(e) {
        response.json(error(e.message));
    }
   
}

export async function processQuest(request: Request, response: Response) {
    const processQuestDto = plainToClass(ProcessQustDto, request.body);
    const errors = await validate(processQuestDto, { skipMissingProperties: true });
    if (errors.length) {
        throw new ArgumentError();
    }
    try {
        const res = await QuestService.process(processQuestDto.userId,processQuestDto.questId, processQuestDto.progress ? processQuestDto.progress : null)
        response.json(ok(res));
    }
    catch(e) {
        response.json(error(e.message));
    }
   
}
export async function getProcessQuest(request: Request, response: Response) {
    if(!request.query.userId) {
        response.json(error('Введите query параметр userId'))
    }
    if(!request.query.questId) {
        response.json(error('Введите query параметр questId'))
    }
    try {
        const res = await QuestService.getProcess(+request.query.userId,+request.query.questId)
        response.json(ok(res));
    }
    catch(e) {
        response.json(error(e.message));
    }
   
}
export async function trackQuest(request: Request, response: Response) {
    if(!request.query.userId || !request.query.questId) {
        response.json(error('Введите query параметр userId и questId'))
    }

    try {
        const res = await QuestService.track(+request.query.userId, +request.query.questId)
        response.json(ok(res));
    }
    catch(e) {
        response.json(error(e.message));
    }
   
}

export async function updateImage(request: Request, response: Response) {
    if(!request.query.id) {
        response.json(error('Введите query параметр id квеста'))
    }
    try {
        const documentFile  = (request as MulterRequest).files;
        var hash = await crypto.createHash('md5').update(Date.now().toString()).digest('hex');
        const pathImage = path.join(__dirname, '../images', `${hash}.png`)
        await fs.writeFileSync(pathImage,documentFile.image.data);
        if(!fs.existsSync(pathImage)) {
            response.json(error('Ошибка при сохранении изображения'))
        }
        const oldQuest = await QuestService.getQuest(+request.query.id)
        if(oldQuest.image) {
            const parsePath = oldQuest.image.split('/')
            const oldPath = path.join(__dirname, '../images', parsePath[parsePath.length - 1])
        
            if(fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath)
            }
        } 
        let pathToClient = `${config.get('protocol')}://${getBaseUrl()}:${config.get('port')}/img/${hash}.png`    
        const res = await QuestService.updateImagePath(+request.query.id, pathToClient)
        response.json(ok(res));
    }
    catch(e) {
        console.log(e);
        
        response.json(error(e.message));
    }
   
}

export async function getImage(request: Request, response: Response) {
    if(!request.query.image) {
        response.json(error('Введите query параметр image квеста'))
    }
    try {   
        fs.createReadStream(<string>request.query.image).pipe(response)
    }
    catch(e) {
        response.json(error(e.message));
    }
   
}


export async function getQR(request: Request, response: Response) {
    if(!request.query.word) {
        response.json(error('Введите query параметр word квеста'))
    }
    try {  
        const res = await QuestService.getQR(<string>request.query.word)
        response.json(ok(res));
    }
    catch(e) {
        response.json(error(e.message));
    }
   
}