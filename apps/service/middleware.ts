import createMiddleware from 'next-intl/middleware';
import { locales, routing } from '@/i18n/routing';
import { NextRequest } from 'next/server';

const publicPagesExact: string[] = [
    // '/',
    // '/recent',
    // '/auth/signin',
    // '/crawler',
];

const publicPages: string[] = [
    // '/profile',
    // '/music',
    // '/pattern',
    // '/skill/exc',
    // '/skill/0',
    // '/rank/skill',
    // '/rank/playcount',
];

const handleI18nRouting = createMiddleware(routing);

export const middleware = (req: NextRequest) => {
    const publicPathnameRegex = RegExp(
        `^(/(${locales.join('|')}))?(((${publicPagesExact
            .flatMap((p) => (p === '/' ? ['', '/'] : p))
            .join('|')})/?$)|((${publicPages
            .flatMap((p) => (p === '/' ? ['', '/'] : p))
            .join('|')})/?.*))`,
        'i',
    );
    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
    if (isPublicPage) {
        return handleI18nRouting(req);
    } else {
        // eslint-disable-next-line
        // return (authMiddleware as any)(req);
    }
};

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'],
};
