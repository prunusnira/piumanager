import { CheckboxItemType } from '@/common/checkbox/data/Checkbox.type';
import { Checkbox } from '@/common/checkbox/component/Checkbox';

const optionList: CheckboxItemType[] = [
    {
        value: 'withRemoved',
        display: '',
    },
];

export const TableMenu = () => {
    return (
        <Checkbox
            group={'tableOption'}
            items={optionList}
        />
    );
};
