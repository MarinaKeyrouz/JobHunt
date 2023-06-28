export class User {
    _id?: string = "";
    email: string = "";
    password: string = "";
    fullName: string = "";
    isCompany: boolean = false;
    appliedJobs: Array<any> = [];
    cv?: Buffer;
}