import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { UserDto } from "./dto";
import { ArgumentError, NotFoundError } from "../error";
import { UserService } from "../service/user";
import { ok, error } from "./utils";
import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import { User } from '../entity/User';
const secret = <string>config.get("secret")
const durationSecret = <string>config.get("durationSecret")

async function createToken(user: UserDto | User): Promise<string>{
    return await jwt.sign({username: user.username, password: user.password}, secret, {expiresIn: durationSecret})  
}
async function getUserByDecoded(decoded: any): Promise<User>{
    const user = await UserService.getUser(decoded.username, decoded.password)   
    user.token = await createToken(user)
    return user
}
export async function get(request: Request, response: Response) {
    if (!request.query.username) {
        response.json(error('Введите query параметр username'))
        return;
    }

    const username = request.query.username as string
    const res = await UserService.get(username)
    
    res ? response.json(ok(res)) : response.json(error('Не существует пользователя с данным username'))  
}

export async function register(request: Request, response: Response) {
    const user = plainToClass(UserDto, request.body);
    const errors = await validate(user, { skipMissingProperties: true });
    if (errors.length) {
        throw new ArgumentError();
    }
    try {
        const res = await UserService.add(user.name, user.password, user.surname, user.username)
        var token = await createToken(user)    
        res.token = token
        response.json(ok(res));
    }
    catch(e) {
        response.json(error(e.message));
    }
}

export async function auth(request: Request, response: Response) {
    const user = plainToClass(UserDto, request.body);
    const errors = await validate(user, { skipMissingProperties: true });
    if (errors.length) {
        throw new ArgumentError();
    }
    else if(!user.token) {
        const res = await UserService.getUser( user.username, user.password)
        if(!res) {
            response.json(error('Такого пользователя нет'));
        }
        else {
            var token = await createToken(user)   
            res.token = token
            response.json(ok(res));
        }
    }
    else {
        jwt.verify(user.token, secret, async function(err, decoded) {
            if (err) {
                response.json(error(err));
            }
            else {
                const res = await getUserByDecoded(decoded)
                
                response.json(ok(res));
            }
          });
    }
}