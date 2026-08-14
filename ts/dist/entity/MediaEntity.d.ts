import { ConectoEntityBase } from '../ConectoEntityBase';
import type { ConectoSDK } from '../ConectoSDK';
import type { Control } from '../types';
import type { Media, MediaCreateData } from '../ConectoTypes';
declare class MediaEntity extends ConectoEntityBase<Media> {
    constructor(client: ConectoSDK, entopts: any);
    make(this: MediaEntity): MediaEntity;
    create(this: any, reqdata?: MediaCreateData, ctrl?: Control): Promise<MediaEntity>;
}
export { MediaEntity };
