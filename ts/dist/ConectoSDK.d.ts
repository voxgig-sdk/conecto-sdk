import { ActionEntity } from './entity/ActionEntity';
import { ContactEntity } from './entity/ContactEntity';
import { ConversationEntity } from './entity/ConversationEntity';
import { CredentialEntity } from './entity/CredentialEntity';
import { IntegrationEntity } from './entity/IntegrationEntity';
import { MediaEntity } from './entity/MediaEntity';
import { MessageEntity } from './entity/MessageEntity';
import { SchemaEntity } from './entity/SchemaEntity';
import { VisitorEntity } from './entity/VisitorEntity';
import { WebhookEntity } from './entity/WebhookEntity';
export type * from './ConectoTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { ConectoEntityBase } from './ConectoEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class ConectoSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Action(entopts?: Record<string, any>): ActionEntity;
    Contact(entopts?: Record<string, any>): ContactEntity;
    Conversation(entopts?: Record<string, any>): ConversationEntity;
    Credential(entopts?: Record<string, any>): CredentialEntity;
    Integration(entopts?: Record<string, any>): IntegrationEntity;
    Media(entopts?: Record<string, any>): MediaEntity;
    Message(entopts?: Record<string, any>): MessageEntity;
    Schema(entopts?: Record<string, any>): SchemaEntity;
    Visitor(entopts?: Record<string, any>): VisitorEntity;
    Webhook(entopts?: Record<string, any>): WebhookEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): ConectoSDK;
    tester(testopts?: any, sdkopts?: any): ConectoSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof ConectoSDK;
export { stdutil, config, BaseFeature, ConectoEntityBase, ConectoSDK, SDK, };
