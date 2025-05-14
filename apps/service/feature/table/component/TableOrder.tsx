'use client';

import { useTableOrder } from '@/feature/table/component/useTableOrder';
import { useTranslations } from 'next-intl';
import { Button } from '@/common/button/Button';

export const TableOrder = () => {
    const { search, updateDisplay, updateOrder, updateSearch } =
        useTableOrder();
    const t = useTranslations('table.menu');
    return (
        <>
            <div>{t('order.title')}</div>
            <div style={{ display: 'flex' }}>
                <Button
                    onClick={() => {
                        updateOrder('NAME');
                    }}
                    text={t('order.name')}
                />
                <Button
                    onClick={() => {
                        updateOrder('VERASC');
                    }}
                    text={`${t('order.version')}▲`}
                />
                <Button
                    onClick={() => {
                        updateOrder('VERDESC');
                    }}
                    text={`${t('order.version')}▼`}
                />
            </div>
            <div>{t('display.title')}</div>
            <div style={{ display: 'flex' }}>
                <Button
                    onClick={() => {
                        updateDisplay('ALL');
                    }}
                    text={t('display.all')}
                />
                <Button
                    onClick={() => {
                        updateDisplay('NOPLAY');
                    }}
                    text={t('display.noplay')}
                />
                <Button
                    onClick={() => {
                        updateDisplay('PLAYED');
                    }}
                    text={t('display.played')}
                />
            </div>
            <input
                value={search}
                onChange={(e) => updateSearch(e.currentTarget.value)}
                placeholder={t('search.placeholder')}
            />
        </>
    );
};
