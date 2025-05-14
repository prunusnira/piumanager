import { useTranslations } from 'next-intl';
import { Button } from '@/common/button/Button';
import { clsx } from 'clsx';
import { useSetAtom } from 'jotai';
import { atomEnv } from '@/common/env/atom/atomEnv';
import { Mode } from '@/common/env/data/Environment';
import { Portal } from '@/common/popup/component/Portal';

interface Props {
    mode: Mode;
    closePortal: () => void;
}

export const ModeChangePopup = ({ mode, closePortal }: Props) => {
    const t = useTranslations('header.mode');
    const updateEnvironment = useSetAtom(atomEnv);

    return (
        <Portal
            popup={{
                title: t('title'),
                content: (
                    <div
                        className={clsx(
                            'flex flex-col justify-center items-center',
                            'gap-[12px] pt-[20px]',
                        )}
                    >
                        <span>{t('content')}</span>
                        <div className={'grid grid-cols-2'}>
                            <Button
                                text="OK"
                                onClick={() => updateEnvironment({ mode })}
                            />
                            <Button
                                text="CANCEL"
                                onClick={closePortal}
                            />
                        </div>
                    </div>
                ),
            }}
        />
    );
};
