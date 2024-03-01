import {IPattern} from "./IPattern";

export interface IUser {
    userName: string,
    userLv: number,
    userPattern: Map<number, IPattern>, // mid, data
}