import { clsx } from 'clsx';
import { getTranslations } from 'next-intl/server';
import { ModeChange } from './ModeChange';

export const Header = async () => {
    const t = await getTranslations('header');
    return (
        <nav
            className={clsx(
                'flex flex-col justify-center self-center',
                'w-full max-w-[1280px] bg-[rgb(37,37,37)]',
            )}
        >
            {/* Logo */}
            <div className="flex items-center w-full gap-[4px]">
                <img
                    src="/logo192.png"
                    alt="logo"
                    className="w-[40px] h-[40px]"
                />
                <span className="text-[24px]">Pump It Up</span>
                <span className="text-[16px]">{t('subtitle')}</span>
            </div>

            {/* Mode change button */}
            <ModeChange />
        </nav>
    );
};
