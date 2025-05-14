'use client';

import { useAtomValue } from 'jotai';
import { atomTableStatus } from '@/feature/table/atom/atomTable';

export const TableInfo = () => {
    const table = useAtomValue(atomTableStatus);

    return (
        <>
            {table.patternType} Lv.{table.patternLevel}
        </>
    );
};
