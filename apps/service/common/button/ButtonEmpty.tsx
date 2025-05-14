import clsx from 'clsx';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<'button'> {
    text: string;
}

export const ButtonEmpty = ({ text, ...rest }: Props) => {
    return (
        <button
            {...rest}
            className={clsx(
                'bg-transparent',
                'border-none',
                'text-[rgb(16,50,90)]',
                'text-[12px] font-bold',
                'overflow-hidden',
                'h-[48px]',
            )}
        >
            {text}
        </button>
    );
};
