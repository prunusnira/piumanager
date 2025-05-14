import { clsx } from 'clsx';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<'button'> {
    text: string;
}

export const Button = ({ text, ...rest }: Props) => {
    return (
        <button
            {...rest}
            className={clsx(
                'w-full px-[20px] py-[10px] m-[1px]',
                'text-white',
                'border-none',
                'bg-gradient-to-r from-[rgb(142,25,128)] to-[rgb(204,32,82)]',
                'cursor-pointer',
            )}
        >
            {text}
        </button>
    );
};
