import { ConectoEntityBase } from '../ConectoEntityBase';
import type { ConectoSDK } from '../ConectoSDK';
import type { Control } from '../types';
import type { Integration, IntegrationLoadMatch, IntegrationListMatch, IntegrationCreateData } from '../ConectoTypes';
declare class IntegrationEntity extends ConectoEntityBase<Integration> {
    constructor(client: ConectoSDK, entopts: any);
    make(this: IntegrationEntity): IntegrationEntity;
    load(this: any, reqmatch?: IntegrationLoadMatch, ctrl?: Control): Promise<IntegrationEntity>;
    list(this: any, reqmatch?: IntegrationListMatch, ctrl?: Control): Promise<IntegrationEntity[]>;
    create(this: any, reqdata?: IntegrationCreateData, ctrl?: Control): Promise<IntegrationEntity>;
}
export { IntegrationEntity };
