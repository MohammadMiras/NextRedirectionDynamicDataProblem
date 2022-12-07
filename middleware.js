import { NextResponse } from 'next/server'
import {checkRedirection} from 'Base'

export async function middleware(request) {
    const { nextUrl } = request
    const {
        href,
        origin,
    } = nextUrl
    const oldUrl = href.replace(origin, '')
    const redirectionResult = await checkRedirection(oldUrl)
    if (redirectionResult.isRedirected) {
        return NextResponse.redirect(new URL(redirectionResult.redirection.newUrl, request.origin))
    }
  
}

export const config = {
    matcher: [     
        '/((?!api|_next/static|favicon.ico).*)',
    ],
}
