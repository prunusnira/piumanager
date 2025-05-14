'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { Popup } from '../data/Popup';
import { clsx } from 'clsx';

interface Props {
    popup: Popup;
}

export const Portal = ({ popup }: Props) => {
    const [isClient, setClient] = useState(false);

    useEffect(() => {
        setClient(true);
    }, []);

    return isClient ? (
        <>
            {createPortal(
                <div
                    className={
                        'w-screen h-screen fixed left-0 top-0 bg-white/70 flex-center'
                    }
                >
                    <div
                        className={clsx(
                            'flex flex-col justify-center items-center',
                            'absolute left-1/2 top-1/2 -translate-1/2',
                            'bg-gray-700',
                            'min-w-[300px]',
                            'rounded-2xl',
                        )}
                    >
                        {/* title */}
                        <div
                            className={clsx(
                                'font-semibold text-[16px] pt-[20px] pb-[10px] px-[30px]',
                                'bg-black text-white w-full',
                                'rounded-t-2xl',
                            )}
                        >
                            {popup.title}
                        </div>

                        {/* content */}
                        <div className={'px-[30px] pb-[20px]'}>
                            {popup.content}
                        </div>
                    </div>
                </div>,
                document.getElementById('portal')!,
            )}
        </>
    ) : null;
};
