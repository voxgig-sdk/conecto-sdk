import { ConectoEntityBase } from '../ConectoEntityBase';
import type { ConectoSDK } from '../ConectoSDK';
import type { Control } from '../types';
import type { Contact, ContactListMatch, ContactCreateData } from '../ConectoTypes';
declare class ContactEntity extends ConectoEntityBase<Contact> {
    constructor(client: ConectoSDK, entopts: any);
    make(this: ContactEntity): ContactEntity;
    list(this: any, reqmatch?: ContactListMatch, ctrl?: Control): Promise<ContactEntity[]>;
    create(this: any, reqdata?: ContactCreateData, ctrl?: Control): Promise<ContactEntity>;
}
export { ContactEntity };
