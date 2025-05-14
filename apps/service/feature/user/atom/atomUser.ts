import { atom } from 'jotai';
import { User } from '../data/User';
import { Pattern } from '@/feature/table/data/Pattern';

export const atomUser = atom<User>({
    userName: '',
    userLv: 0,
    userPattern: new Map<number, Pattern>(),
});

export const atomSingleSkill = atom<number>(0);

export const atomDoubleSkill = atom<number>(0);

export const atomSingleList = atom<Array<number>>([]);

export const atomDoubleList = atom<Array<number>>([]);
