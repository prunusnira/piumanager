import { useState } from "react"

type SearchBarReturn = [
    (k: string) => void,
    () => void,
    (e: React.KeyboardEvent<HTMLInputElement>) => void,
]

const useSearchBar = (
    querySearch: (q: string) => void
): SearchBarReturn => {
    const [keyword, setKeyword] = useState('')

    const checkEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') runQuery()
    }

    const runQuery = () => {
        querySearch(keyword)
    }

    return [setKeyword, runQuery, checkEnter]
}

export default useSearchBar