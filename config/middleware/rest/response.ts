import * as Koa from 'koa';
import { HTTP_CODE } from './code';

const makeDefaultResponse = (data:object | string = {}):object =>
    typeof data === 'string' ? {error:data}:data

const ok = (ctx:Koa.Context)=> (data?:object | string):void=>{
    ctx.status = HTTP_CODE.OK
    ctx.body = makeDefaultResponse(data)
}

const created = (ctx: Koa.Context) => (data?: object | string): void => {
    ctx.status = HTTP_CODE.CREATED
    ctx.body = makeDefaultResponse(data)
}

const noContent = (ctx: Koa.Context) => (): void => {
    ctx.status = HTTP_CODE.NO_CONTENT
    ctx.body = null
}

const badRequest = (ctx: Koa.Context) => (data?: object | string): void => {
    ctx.status = HTTP_CODE.BAD_REQUEST
    ctx.body = makeDefaultResponse(data)
}

const unauthorized = (ctx:Koa.Context)=> (data?: object | string): void => {
    ctx.status = HTTP_CODE.UNAUTHORIZED
    ctx.body = makeDefaultResponse(data)
}

const forbidden = (ctx: Koa.Context) => (data?: object | string): void => {
    ctx.status = HTTP_CODE.FORBIDDEN
    ctx.body = makeDefaultResponse(data)
}

const notFound = (ctx: Koa.Context) => (data?: object | string): void => {
    ctx.status = HTTP_CODE.NOT_FOUND
    ctx.body = makeDefaultResponse(data)
}

const conflict = (ctx: Koa.Context) => (data?: object | string): void => {
    ctx.status = HTTP_CODE.CONFLICT
    ctx.body = makeDefaultResponse(data)
}

const unprocessableEntity = (ctx: Koa.Context) => (data?: object | string): void => {
    ctx.status = HTTP_CODE.UNPROCESSABLE_ENTITY
    ctx.body = makeDefaultResponse(data)
}

const serverError = (ctx: Koa.Context) => (data?: object | string): void => {
    ctx.status = HTTP_CODE.SERVER_ERROR
    ctx.body = makeDefaultResponse(data)
}

const catchFunc = (ctx: Koa.Context) => (err: any | Error = {}, data?: object | string): void => {
    const isErrorStack = typeof err === 'object' && err instanceof Error
    const error = isErrorStack ? {
      errors: {
        name: err.name || null, message: err.message || null,
      },
    } : { errors: String(err) }
    const extra = makeDefaultResponse(data)
    ctx.status = 501
    ctx.body = Object.assign({}, error, extra)
}
  
const reply = (ctx: Koa.Context) => (code: number, data?: object | string): void => {
    ctx.status = code
    ctx.body = makeDefaultResponse(data)
}

export const Rest = () => async(ctx: Koa.Context, next) => {
    ctx.ok = ok(ctx)
    ctx.created = created(ctx)
    ctx.noContent = noContent(ctx)

    ctx.badRequest = badRequest(ctx)
    ctx.unauthorized = unauthorized(ctx)
    ctx.forbidden = forbidden(ctx)
    ctx.notFound = notFound(ctx)
    ctx.conflict = conflict(ctx)
    ctx.unprocessableEntity = unprocessableEntity(ctx)

    ctx.serverError = serverError(ctx)
    ctx.catch = catchFunc(ctx)
    ctx.reply = reply(ctx)
    await next()
}