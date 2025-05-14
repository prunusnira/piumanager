import { useAtom } from 'jotai';
import { atomEnv } from '@/common/env/atom/atomEnv';
import { MusicItem } from '@/feature/music/data/Music';
import { rankToText } from '@/feature/table/tool/convertRankText';
import { convertVersion } from '@/feature/table/tool/convertVersion';
import { RankType } from '@/feature/table/data/Rank';
import { Pattern } from '@/feature/table/data/Pattern';

type Props = {
    pattern?: Pattern;
    bgImageUrl: string;
    musicData: MusicItem;
};

const JacketArea = ({ pattern, bgImageUrl, musicData }: Props) => {
    const [env, setEnv] = useAtom(atomEnv);

    return (
        <div
            className={'relative w-full h-full aspect-[4/3]'}
            onClick={() => {
                setEnv({
                    updateDialog: 'SINGLE',
                    singleUpdatePatternId: musicData.patternId,
                    singleUpdateMusicTitle: musicData.titleEn,
                });
            }}
        >
            {/*{(d.steptype === 1 || d.steptype === 2) && (*/}
            {/*    <StepType*/}
            {/*        alt="steptype"*/}
            {/*        src={`${process.env.PUBLIC_URL}/img/${d.steptype === 1 ? "half" : ""}${*/}
            {/*            d.steptype === 2 ? "perf" : ""*/}
            {/*        }.png`}*/}
            {/*    />*/}
            {/*)}*/}
            {convertVersion(musicData.version) !== '' && (
                <img
                    className={'absolute w-[40%] right-0 bottom-0'}
                    alt="version"
                    src={`/img/ver/${convertVersion(musicData.version)}.png`}
                />
            )}
            {musicData.newpattern === 1 && (
                <img
                    className={'absolute w-1/2 left-0 bottom-0'}
                    alt="new"
                    src="/img/new.png"
                />
            )}
            {musicData.removed === 1 && (
                <img
                    className={'absolute w-1/2 left-0 bottom-0'}
                    alt="removed"
                    src="/img/removed.png"
                />
            )}
            {env.displayRank && (
                <img
                    className={'absolute w-1/2 right-0 top-0'}
                    alt="rank"
                    id={`cs${musicData.patternId}`}
                    src={`/img/${rankToText(pattern?.rank || RankType.NP)}.png`}
                />
            )}
            <img
                className={'absolute w-1/2 right-0 top-1/4'}
                alt="breakoff"
                id={`bo${musicData.patternId}`}
                src="/img/phrank/empty.png"
            />
            <img
                className={'absolute w-full aspect-[4/3]'}
                alt="jacket"
                src={`${process.env.NEXT_PUBLIC_IMG}/${musicData.musicId}.png`}
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/img/empty.png';
                }}
            />
        </div>
    );
};

export default JacketArea;
