import { Context } from './Context';
declare class ConectoError extends Error {
    isConectoError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { ConectoError };
