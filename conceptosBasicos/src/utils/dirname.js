/*
    AL USAR ECMAScript Modules la vble global __dirname deja de existir. Para seguir usandola he creado esta utilidad. La he creado, la exporto y podré importarla alla donde la necesite
*/

import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export { __dirname }
