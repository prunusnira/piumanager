import { MusicItem } from '@/feature/music/data/Music';
import { useAtom } from 'jotai';
import { atomEnv } from '@/common/env/atom/atomEnv';
import JacketArea from '@/feature/music/component/JacketArea';
import { ButtonEmpty } from '@/common/button/ButtonEmpty';
import { Pattern } from '@/feature/table/data/Pattern';
import { CheckboxItem } from '@/common/checkbox/component/Checkbox.item';

interface Props {
    item: MusicItem;
    pattern: Map<number, Pattern>;
}

export const MusicCell = ({ item, pattern }: Props) => {
    const [env, setEnv] = useAtom(atomEnv);

    return (
        <section
            className={'flex flex-col p-[1px] w-[100px] items-start relative'}
        >
            <span data-songtype={item.songtype} />
            {env.displayCheckbox && (
                <div className={'w-full'}>
                    <CheckboxItem
                        group="pattern"
                        item={{
                            value: String(item.patternId),
                            display: '',
                        }}
                    />
                </div>
            )}
            <JacketArea
                pattern={pattern.get(item.patternId)}
                bgImageUrl={`${process.env.NEXT_PUBLIC_IMG}${item.musicId}.png`}
                musicData={item}
            />
            <div className={'w-full'}>
                <ButtonEmpty
                    text={item.titleEn}
                    onClick={() => {
                        setEnv({
                            singleUpdatePatternId: item.patternId,
                            singleUpdateMusicTitle: item.titleEn,
                        });
                    }}
                />
            </div>
        </section>
    );
};
