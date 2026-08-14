import { ConectoEntityBase } from '../ConectoEntityBase';
import type { ConectoSDK } from '../ConectoSDK';
import type { Control } from '../types';
import type { Credential, CredentialLoadMatch } from '../ConectoTypes';
declare class CredentialEntity extends ConectoEntityBase<Credential> {
    constructor(client: ConectoSDK, entopts: any);
    make(this: CredentialEntity): CredentialEntity;
    load(this: any, reqmatch?: CredentialLoadMatch, ctrl?: Control): Promise<CredentialEntity>;
}
export { CredentialEntity };
