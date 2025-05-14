'use client';

import React from 'react';
import { useAtomValue } from 'jotai';
import { atomEnv } from '@/common/env/atom/atomEnv';

export const UserInfo = () => {
    const env = useAtomValue(atomEnv);
    return (
        <>
            {/* name and skills */}
            <section>
                <div>username</div>
                <div>
                    <span>SKILL POINTS (SINGLE)</span>
                    <span></span>
                </div>
                <div>
                    <span>SKILL POINTS (DOUBLE)</span>
                    <span></span>
                </div>
            </section>

            {/* rank count */}
            <section>
                <span>
                    SSS+: {env.rankCount.sssp} (BO {env.rankCount.ssspb})
                </span>
                <span>
                    SSS: {env.rankCount.sss} (BO {env.rankCount.sssb})
                </span>
                <span>
                    SS+: {env.rankCount.ssp} (BO {env.rankCount.sspb})
                </span>
                <span>
                    SS: {env.rankCount.ss} (BO {env.rankCount.ssb})
                </span>
                <span>
                    S+: {env.rankCount.sp} (BO {env.rankCount.spb})
                </span>
                <span>
                    S: {env.rankCount.s} (BO {env.rankCount.sb})
                </span>
                <span>
                    AAA+: {env.rankCount.aaap} (BO {env.rankCount.aaapb})
                </span>
                <span>
                    AAA: {env.rankCount.aaa} (BO {env.rankCount.aaab})
                </span>
                <span>
                    AA+: {env.rankCount.aap} (BO {env.rankCount.aapb})
                </span>
                <span>
                    AA: {env.rankCount.aa} (BO {env.rankCount.aab})
                </span>
                <span>
                    A+: {env.rankCount.ap} (BO {env.rankCount.apb})
                </span>
                <span>
                    A: {env.rankCount.a} (BO {env.rankCount.ab})
                </span>
                <span>
                    B: {env.rankCount.b} (BO {env.rankCount.bb})
                </span>
                <span>
                    C: {env.rankCount.c} (BO {env.rankCount.cb})
                </span>
                <span>
                    D: {env.rankCount.d} (BO {env.rankCount.db})
                </span>
                <span>
                    F: {env.rankCount.f} (BO {env.rankCount.fb})
                </span>
            </section>
        </>
    );
};
