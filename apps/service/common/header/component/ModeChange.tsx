'use client';

import { Button } from '@/common/button/Button';
import { useTranslations } from 'next-intl';
import { useModeChange } from '@/common/header/component/useModeChange';
import { ModeChangePopup } from '@/common/header/component/ModeChange.popup';

export const ModeChange = () => {
    const t = useTranslations('header');
    const {
        displayModeChangePopup,
        openModeChangePopup,
        closeModeChangePopup,
        mode,
    } = useModeChange();

    return (
        <>
            <div className="flex items-center w-full gap-[4px]">
                <Button
                    text={t('table')}
                    onClick={() => openModeChangePopup()}
                />
                <Button
                    text={t('search')}
                    onClick={() => openModeChangePopup()}
                />
            </div>

            {displayModeChangePopup && (
                <ModeChangePopup
                    mode={mode}
                    closePortal={closeModeChangePopup}
                />
            )}
        </>
    );
};
