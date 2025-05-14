import { CheckboxItemType } from '@/common/checkbox/data/Checkbox.type';

interface Props {
    group: string;
    item: CheckboxItemType;
}

export const CheckboxItem = ({ group, item }: Props) => {
    return (
        <div>
            {/* checker */}
            <div></div>

            {/* text */}
            <span>{item.display}</span>

            {/* actual input */}
            <input
                type={'checkbox'}
                value={item.value}
                name={group}
            />
        </div>
    );
};
