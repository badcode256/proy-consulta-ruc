export interface CustomerImplRepository {
    insertMany(obj: Object): Promise<any>;
    get(obj: Object): Promise<any>;

}