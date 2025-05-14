'use client';

import { useAtom } from 'jotai';
import { atomTableStatus } from '@/feature/table/atom/atomTable';

export const useTableOrder = () => {
    const [table, setTable] = useAtom(atomTableStatus);

    const updateOrder = (order: 'NAME' | 'VERASC' | 'VERDESC') => {
        setTable({ sortOrder: order });
    };

    const updateDisplay = (display: 'ALL' | 'NOPLAY' | 'PLAYED') => {
        setTable({ display });
    };

    const updateSearch = (search: string) => {
        setTable({ search });
    };

    return {
        search: table.search,
        updateOrder,
        updateDisplay,
        updateSearch,
    };
};
