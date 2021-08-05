import {makeAutoObservable} from 'mobx'
import { MusicTable } from "../components/table/data/musicTable"

const emptyTable: MusicTable = {
    over: {
        title: '',
        data: []
    },
    high: {
        title: '',
        data: []
    },
    normalhigh: {
        title: '',
        data: []
    },
    normal: {
        title: '',
        data: []
    },
    normaleasy: {
        title: '',
        data: []
    },
    easy: {
        title: '',
        data: []
    },
    below: {
        title: '',
        data: []
    },
    random: {
        title: '',
        data: []
    },
}

class StoreTable {
    constructor() {
        makeAutoObservable(this)
    }

    public table = emptyTable

    public setTable = (t: MusicTable) => {
        this.table = t
    }
}

export default new StoreTable()