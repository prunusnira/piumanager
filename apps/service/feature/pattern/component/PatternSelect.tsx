'use client';

import { Select } from '@/common/select/Select';
import { useAtom } from 'jotai';
import { atomTableStatus } from '@/feature/table/atom/atomTable';
import {
    formatToPatternValue,
    parsePatternValue,
} from '@/feature/table/tool/patternConvertor';
import { ChangeEvent } from 'react';

const optionList = [
    {
        value: 'none',
        display: 'Select Pattern',
    },
    {
        value: 's13',
        display: 'S13',
    },
    {
        value: 's14',
        display: 'S14',
    },
    {
        value: 's15',
        display: 'S15',
    },
    {
        value: 's16',
        display: 'S16',
    },
    {
        value: 's17',
        display: 'S17',
    },
    {
        value: 's18',
        display: 'S18',
    },
    {
        value: 's19',
        display: 'S19',
    },
    {
        value: 's20',
        display: 'S20',
    },
    {
        value: 's21',
        display: 'S21',
    },
    {
        value: 's22',
        display: 'S22',
    },
    {
        value: 's23',
        display: 'S23',
    },
    {
        value: 's24',
        display: 'S24',
    },
    {
        value: 's25',
        display: 'S25',
    },
    {
        value: 's26',
        display: 'S26+',
    },
    {
        value: 'd13',
        display: 'D13',
    },
    {
        value: 'd14',
        display: 'D14',
    },
    {
        value: 'd15',
        display: 'D15',
    },
    {
        value: 'd16',
        display: 'D16',
    },
    {
        value: 'd17',
        display: 'D17',
    },
    {
        value: 'd18',
        display: 'D18',
    },
    {
        value: 'd19',
        display: 'D19',
    },
    {
        value: 'd20',
        display: 'D20',
    },
    {
        value: 'd21',
        display: 'D21',
    },
    {
        value: 'd22',
        display: 'D22',
    },
    {
        value: 'd23',
        display: 'D23',
    },
    {
        value: 'd24',
        display: 'D24',
    },
    {
        value: 'd25',
        display: 'D25',
    },
    {
        value: 'd26',
        display: 'D26',
    },
    {
        value: 'd27',
        display: 'D27',
    },
    {
        value: 'd28',
        display: 'D28+',
    },
    {
        value: 'coopx2',
        display: 'COOPx2',
    },
    {
        value: 'coopx3',
        display: 'COOPx3',
    },
    {
        value: 'coopx4',
        display: 'COOPx4',
    },
    {
        value: 'coopx5plus',
        display: 'COOPx5+',
    },
];

export const PatternSelect = () => {
    const [status, setStatus] = useAtom(atomTableStatus);

    return (
        <Select
            options={optionList}
            value={
                formatToPatternValue({
                    type: status.patternType,
                    number: status.patternLevel,
                }) ?? 'none'
            }
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                const converted = parsePatternValue(e.currentTarget.value);
                if (converted) {
                    setStatus({
                        ...status,
                        patternType: converted.type,
                        patternLevel: converted.number,
                    });
                }
            }}
        />
    );
};
