'use client';

import { Mode } from '@/common/env/data/Environment';
import { useMemo, useState } from 'react';
import { useAtomValue } from 'jotai';
import { atomEnv } from '@/common/env/atom/atomEnv';

export const useModeChange = () => {
    const env = useAtomValue(atomEnv);

    const [displayModeChangePopup, setPopup] = useState(false);

    const openModeChangePopup = () => {
        setPopup(true);
    };

    const closeModeChangePopup = () => {
        setPopup(false);
    };

    const oppositeMode: Mode = useMemo(() => {
        if (env.mode === 'TABLE') return 'SEARCH';
        return 'TABLE';
    }, [env]);

    return {
        displayModeChangePopup,
        openModeChangePopup,
        closeModeChangePopup,
        mode: oppositeMode,
    };
};
