import { ConectoEntityBase } from '../ConectoEntityBase';
import type { ConectoSDK } from '../ConectoSDK';
import type { Control } from '../types';
import type { Webhook, WebhookLoadMatch, WebhookListMatch, WebhookCreateData, WebhookRemoveMatch } from '../ConectoTypes';
declare class WebhookEntity extends ConectoEntityBase<Webhook> {
    constructor(client: ConectoSDK, entopts: any);
    make(this: WebhookEntity): WebhookEntity;
    load(this: any, reqmatch?: WebhookLoadMatch, ctrl?: Control): Promise<WebhookEntity>;
    list(this: any, reqmatch?: WebhookListMatch, ctrl?: Control): Promise<WebhookEntity[]>;
    create(this: any, reqdata?: WebhookCreateData, ctrl?: Control): Promise<WebhookEntity>;
    remove(this: any, reqmatch?: WebhookRemoveMatch, ctrl?: Control): Promise<WebhookEntity>;
}
export { WebhookEntity };
