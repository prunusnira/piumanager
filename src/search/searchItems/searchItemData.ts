import SearchPatternData from "./searchPatternData";

class SearchItemData {
    musicid: number;
    title_ko: string;
    title_en: string;
    patterns: SearchPatternData[];

    constructor() {
        this.musicid = 1;
        this.title_ko = '';
        this.title_en = '';
        this.patterns = Array<SearchPatternData>()
    }
}

export default SearchItemData;