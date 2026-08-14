import { ConectoEntityBase } from '../ConectoEntityBase';
import type { ConectoSDK } from '../ConectoSDK';
import type { Control } from '../types';
import type { Schema, SchemaLoadMatch } from '../ConectoTypes';
declare class SchemaEntity extends ConectoEntityBase<Schema> {
    constructor(client: ConectoSDK, entopts: any);
    make(this: SchemaEntity): SchemaEntity;
    load(this: any, reqmatch?: SchemaLoadMatch, ctrl?: Control): Promise<SchemaEntity>;
}
export { SchemaEntity };
