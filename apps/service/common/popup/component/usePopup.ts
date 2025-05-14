import { useAtom } from 'jotai';
import { atomPopup } from '@/common/popup/data/atomPopup';
import { ReactNode } from 'react';
import { nanoid } from 'nanoid';

interface OpenParams {
    title: string;
    content: ReactNode;
    id?: string;
}

export const usePopup = () => {
    const [popupList, setPopupList] = useAtom(atomPopup);

    const openPopup = ({ title, content, id }: OpenParams) => {
        const popupId = id ?? nanoid();
        setPopupList([...popupList, { title, content, id: popupId }]);
        console.log('open popup', title);
    };

    const closePopup = (id: string) => {
        setPopupList(popupList.filter((popup) => popup.id !== id));
    };

    return {
        openPopup,
        closePopup,
    };
};
