import SearchItemData from "./searchItemData";
import SearchPatternData from "./searchPatternData";

class SearchItemTool {
    static addPattern = (arr: Array<SearchItemData>, item: SearchItemData) => {
        let found = false;
        for(let i = 0; i < arr.length; i++) {
            if(arr[i].title_en === item.title_en) {
                arr[i].patterns.push(item.patterns[0]);
                found = true;
                break;
            }
        }
        if(!found) arr.push(item);
    }
}

export default SearchItemTool