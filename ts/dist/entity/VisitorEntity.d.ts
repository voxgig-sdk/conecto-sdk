import { ConectoEntityBase } from '../ConectoEntityBase';
import type { ConectoSDK } from '../ConectoSDK';
import type { Control } from '../types';
import type { Visitor, VisitorCreateData } from '../ConectoTypes';
declare class VisitorEntity extends ConectoEntityBase<Visitor> {
    constructor(client: ConectoSDK, entopts: any);
    make(this: VisitorEntity): VisitorEntity;
    create(this: any, reqdata?: VisitorCreateData, ctrl?: Control): Promise<VisitorEntity>;
}
export { VisitorEntity };
