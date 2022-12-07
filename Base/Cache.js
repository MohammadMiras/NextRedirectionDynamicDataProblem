const path = require(`path`)
const fs = require('fs')
var crypto = require('crypto');
import { get } from 'Base'

const getCacheDirectory = () => {
    const currentDirectory = path.resolve(__dirname)
    const cacheDirectory = path.join(currentDirectory.split('.next')[0], 'cache')
    return cacheDirectory
}

const getFromCacheOrApi = async (url) => {
    const start = new Date()
    const cacheDirectory = getCacheDirectory()
    let fileName = url
    fileName = fileName.replace(/\//ig, '_')
    fileName = crypto.createHash('md5').update(encodeURI(fileName)).digest('hex');
    const cacheFilePath = path.join(cacheDirectory, fileName)
    if (fs.existsSync(cacheFilePath)) {
        console.log(`Getting ${url} from cache ...`)
        const data = fs.readFileSync(cacheFilePath).toString()
        const end = new Date()
        console.log(`Took ${end - start} milliseconds`)
        return JSON.parse(data)
    }

    console.log(`Getting ${url} from API ...`)
    const data = await get(url)

    const { statusCode } = data
    if (statusCode) {
        console.log("Not using the cache because Status Code")
        return data
    }

    if (!fs.existsSync(cacheDirectory)) {
        fs.mkdirSync(cacheDirectory)
    }
    fs.writeFileSync(cacheFilePath, JSON.stringify(data))
    const end = new Date()
    console.log(`Took ${end - start} milliseconds`)
    return data
}

const clearCache = () => {
    console.log('Clearing cache ...')
    const cacheDirectory = getCacheDirectory()
    if (fs.existsSync(cacheDirectory)) {
        const files = fs.readdirSync(cacheDirectory)
        for (let i = 0; i < files.length; i++) {
            const file = path.join(cacheDirectory, files[i])
            fs.unlinkSync(file)
            console.log(`Removed ${file}`)
        }
    }
    console.log('Cleared the cache')
}

export { getFromCacheOrApi }
export { clearCache }
