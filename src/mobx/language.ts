import {makeAutoObservable} from 'mobx'
import {makePersistable, isPersisting} from 'mobx-persist-store'

class StoreLanguage {
    constructor() {
        makeAutoObservable(this)
        makePersistable(
            this,
            {
                name: 'StoreLanguage',
                properties: ['language'],
                storage: window.localStorage,
            }
        )
    }

    public language = ''

    public setLanguage = (lang: string) => {
        this.language = lang
    }

    public isPersist = () => {
        return isPersisting(this)
    }
}

export default new StoreLanguage()