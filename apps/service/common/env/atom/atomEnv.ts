import { atom } from 'jotai';
import { Environment } from '@/common/env/data/Environment';
import { emptyRankCount } from '@/feature/table/data/TableTypes';

const atomEnvData = atom<Environment>({
    mode: 'TABLE',
    userDialog: 'NEWUSER',
    resetDialog: 'NONE',
    shareDialog: 'SUCCESS',
    shareCode: '',
    updateDialog: 'SINGLE',
    singleUpdateMusicTitle: '',
    singleUpdatePatternId: 0,
    updateRank: 'PH_F',
    rankCount: emptyRankCount,
    displayCheckbox: false,
    displayRank: true,
    displayRemoved: false,
});

export const atomEnv = atom(
    (get) => get(atomEnvData),
    (get, set, data: Partial<Environment>) =>
        set(atomEnvData, { ...get(atomEnvData), ...data }),
);
