import { NextResponse } from 'next/server'
import { getFromCacheOrApi } from 'Base'

export async function middleware(request) {
    const { nextUrl } = request
    const {
        href,
        origin,
    } = nextUrl
    const oldUrl = href.replace(origin, '')
    const data = await getFromCacheOrApi("/v1/01925c4c-b71b-46f5-ba9a-522071071374")
  
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|favicon.ico).*)',
    ],
}
