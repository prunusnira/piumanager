import { CheckboxItemType } from '@/common/checkbox/data/Checkbox.type';
import { CheckboxItem } from '@/common/checkbox/component/Checkbox.item';

interface Props {
    group: string;
    items: CheckboxItemType[];
}

export const Checkbox = ({ group, items }: Props) => {
    return (
        <div>
            {items.map((item) => (
                <CheckboxItem
                    key={item.value}
                    item={item}
                    group={group}
                />
            ))}
        </div>
    );
};
