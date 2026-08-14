import { ConectoEntityBase } from '../ConectoEntityBase';
import type { ConectoSDK } from '../ConectoSDK';
import type { Control } from '../types';
import type { Conversation, ConversationLoadMatch, ConversationListMatch, ConversationCreateData, ConversationUpdateData } from '../ConectoTypes';
declare class ConversationEntity extends ConectoEntityBase<Conversation> {
    constructor(client: ConectoSDK, entopts: any);
    make(this: ConversationEntity): ConversationEntity;
    load(this: any, reqmatch?: ConversationLoadMatch, ctrl?: Control): Promise<ConversationEntity>;
    list(this: any, reqmatch?: ConversationListMatch, ctrl?: Control): Promise<ConversationEntity[]>;
    create(this: any, reqdata?: ConversationCreateData, ctrl?: Control): Promise<ConversationEntity>;
    update(this: any, reqdata?: ConversationUpdateData, ctrl?: Control): Promise<ConversationEntity>;
}
export { ConversationEntity };
