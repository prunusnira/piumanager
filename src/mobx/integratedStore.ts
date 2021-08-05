import Language from './language'
import Status from './status'
import Table from './table'
import User from './user'

const language = Language
const table = Table
const user = User
const status = Status

const IntegratedStore = {
    language,
    table,
    user,
    status
}

export default IntegratedStore