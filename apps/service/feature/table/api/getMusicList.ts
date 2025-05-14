import { fetchExtended } from '@/lib/fetch/FetchExtended';
import { API_MUSICLIST } from '@/lib/fetch/url';
import { PatternItem } from '@/feature/music/data/Music';

interface Params {
    type: string;
    level: number;
}

export const getMusicList = ({ type, level }: Params) => {
    return fetchExtended.get<PatternItem[]>(API_MUSICLIST(type, level));
};
