import { CheckboxItemType } from '@/common/checkbox/data/Checkbox.type';
import { Checkbox } from '@/common/checkbox/component/Checkbox';

const MusicTypes: CheckboxItemType[] = [
    {
        value: 'arcade',
        display: 'Arcade',
    },
    {
        value: 'full',
        display: 'FullSong',
    },
    {
        value: 'remix',
        display: 'Remix',
    },
    {
        value: 'short',
        display: 'Shortcut',
    },
];

export const MusicTypeCheck = () => {
    return (
        <Checkbox
            group={'musictype'}
            items={MusicTypes}
        />
    );
};
