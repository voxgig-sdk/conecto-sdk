import { ConectoEntityBase } from '../ConectoEntityBase';
import type { ConectoSDK } from '../ConectoSDK';
import type { Control } from '../types';
import type { ActionResult, ActionResultCreateData } from '../ConectoTypes';
declare class ActionResultEntity extends ConectoEntityBase<ActionResult> {
    constructor(client: ConectoSDK, entopts: any);
    make(this: ActionResultEntity): ActionResultEntity;
    create(this: any, reqdata?: ActionResultCreateData, ctrl?: Control): Promise<ActionResultEntity>;
}
export { ActionResultEntity };
