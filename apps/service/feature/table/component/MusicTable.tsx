'use client';

import React from 'react';
import { useAtomValue } from 'jotai';
import { MusicCell } from '@/feature/music/component/MusicCell';
import { atomEnv } from '@/common/env/atom/atomEnv';
import { atomUser } from '@/feature/user/atom/atomUser';
import { useQuery } from '@tanstack/react-query';
import { getMusicList } from '@/feature/table/api/getMusicList';
import { atomTableStatus } from '@/feature/table/atom/atomTable';

export const MusicTable = () => {
    const env = useAtomValue(atomEnv);
    const user = useAtomValue(atomUser);
    const table = useAtomValue(atomTableStatus);

    const {
        data: list,
        isLoading,
        isError,
    } = useQuery({
        queryKey: [table],
        queryFn: () =>
            getMusicList({
                type: table.patternType,
                level: table.patternLevel,
            }),
    });

    if (isLoading) {
        return <>LOADING</>;
    }

    if (isError) {
        return <>ERROR</>;
    }

    return (
        <>
            {(list || []).map((music, i) => {
                if (!env.displayRemoved && music.removed === 1) {
                    return <></>;
                }

                return (
                    <MusicCell
                        item={music}
                        pattern={user.userPattern}
                    />
                );
            })}
        </>
    );
};
