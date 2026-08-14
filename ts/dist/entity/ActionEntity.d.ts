import { ConectoEntityBase } from '../ConectoEntityBase';
import type { ConectoSDK } from '../ConectoSDK';
import type { Control } from '../types';
import type { Action, ActionCreateData } from '../ConectoTypes';
declare class ActionEntity extends ConectoEntityBase<Action> {
    constructor(client: ConectoSDK, entopts: any);
    make(this: ActionEntity): ActionEntity;
    create(this: any, reqdata?: ActionCreateData, ctrl?: Control): Promise<ActionEntity>;
}
export { ActionEntity };
