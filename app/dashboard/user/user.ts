export interface IUser {
    id: number;
    name: string;
    password: string;
    role: string;
    account: string;
}

export class User implements IUser {
    id: number;
    name: string;
    password: string;
    role: string;
    account: string;
}

