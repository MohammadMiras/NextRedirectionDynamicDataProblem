import { getFromCacheOrApi } from 'Base'

const logRedirect = (url) => {
    
}

const isGone = (url, goneUrls) => {
    if (goneUrls.find(url)) {
        return true
    }
    return false
}

const getLiterallyRedirectedUrl = (url, literalRedirects) => {
    const literallyRedirectedUrl = literalRedirects.find(i => i.oldUrl == url)
    return literallyRedirectedUrl || false
}

const getRegexRedirected = (url, regexRedirects) => {
    return false
}

const checkRedirection = async (url) => {
    const redirects = await getFromCacheOrApi('/v1/e023f681-0bda-4fa7-82e4-126973c9b086')
    const { goneUrls, literalRedirects, regexRedirects } = redirects

    let result = {
        isRedirected: false
    }
    if (isGone(url, goneUrls)) {
        logRedirect(url)
        return {
            isRedirected: true,
            redirection: {
                statusCode: 410,
                newUrl: url
            }
        }
    }
    const literallyRedirectedUrl = getLiterallyRedirectedUrl(url, literalRedirects)
    if (literallyRedirectedUrl) {
        logRedirect(url)
        return {
            isRedirected: true,
            redirection: {
                permanent: true,
                newUrl: literallyRedirectedUrl.newUrl
            }
        }
    }
    const regexRedirectedUrl = getRegexRedirected(url, regexRedirects)
    if (regexRedirectedUrl) {
        logRedirect(url)
        return {
            isRedirected: true,
            redirection: {
                permanent: true,
                newUrl: newUrl
            }
        }
    }
}

export default checkRedirection
