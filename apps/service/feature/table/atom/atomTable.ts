import { atom } from 'jotai';
import { TableDisplay, TableStatus } from '@/feature/table/data/Table';

export const atomTableStatusData = atom<TableStatus>({
    isShareData: false,
    isUserLoaded: false,
    patternIdList: [],
    patternLevel: 0,
    patternType: 'SINGLE',
    sortOrder: 'NAME',
    display: 'ALL',
    search: undefined,
});

export const atomTableDisplayData = atom<TableDisplay>({
    arcade: true,
    checkbox: false,
    full: true,
    rank: true,
    remix: true,
    removed: false,
    short: true,
});

export const atomTableStatus = atom(
    (get) => get(atomTableStatusData),
    (get, set, data: Partial<TableStatus>) =>
        set(atomTableStatusData, { ...get(atomTableStatusData), ...data }),
);

export const atomTableDisplay = atom(
    (get) => get(atomTableDisplayData),
    (get, set, data: Partial<TableDisplay>) =>
        set(atomTableDisplayData, { ...get(atomTableDisplayData), ...data }),
);
