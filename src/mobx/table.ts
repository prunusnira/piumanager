import {makeAutoObservable} from 'mobx'
import { MusicTable } from "../data/musicTable"

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

    public resetTable = () => {
        this.table.over.data = [];
        this.table.high.data = [];
        this.table.normalhigh.data = [];
        this.table.normal.data = [];
        this.table.normaleasy.data = [];
        this.table.easy.data = [];
        this.table.below.data = [];
        this.table.random.data = [];
    }
}

const Table = new StoreTable()

export default Table;