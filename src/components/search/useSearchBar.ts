import { useState } from "react"

const useSearchBar = (
    querySearch: (q: string) => void
) => {
    const [keyword, setKeyword] = useState('')
    const [withRemoved, setWithRemoved] = useState(false)

    const checkEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') runQuery()
    }

    const runQuery = () => {
        querySearch(keyword)
    }

    return {setKeyword, runQuery, checkEnter, withRemoved, setWithRemoved}
}

export default useSearchBar