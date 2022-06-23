import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request } from "express";
import { ResponseDto } from "./dto";

export async function toDto<T>(request: Request, type: ClassConstructor<T>): Promise<T> {
    const user = plainToClass(type, request.body);
    const errors = await validate(user as unknown as object, { skipMissingProperties: true });
    if (errors.length)
        throw new Error()
    return user;

}

export function ok(data?: any): ResponseDto {
    return {
        status: 'ok',
        ...data && { data }
    }
}

export function error(info?: any): ResponseDto {
    return {
        status: 'error',
        ...info && { info }
    }
}