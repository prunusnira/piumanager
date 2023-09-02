import {ISearchItem} from "../data/ISearchItem"

class SearchItemTool {
    static addPattern = (arr: Array<ISearchItem>, item: ISearchItem) => {
        let found = false
        for(let i = 0; i < arr.length; i++) {
            if(arr[i].title_en === item.title_en) {
                arr[i].patterns.push(item.patterns[0])
                found = true
                break
            }
        }
        if(!found) arr.push(item)
    }
}

export default SearchItemTool