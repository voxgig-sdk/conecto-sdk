import { ConectoEntityBase } from '../ConectoEntityBase';
import type { ConectoSDK } from '../ConectoSDK';
import type { Control } from '../types';
import type { Message, MessageCreateData } from '../ConectoTypes';
declare class MessageEntity extends ConectoEntityBase<Message> {
    constructor(client: ConectoSDK, entopts: any);
    make(this: MessageEntity): MessageEntity;
    create(this: any, reqdata?: MessageCreateData, ctrl?: Control): Promise<MessageEntity>;
}
export { MessageEntity };
