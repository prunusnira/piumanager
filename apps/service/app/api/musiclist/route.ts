import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/api/RouteWrapper';
import prisma from '@/lib/db/prisma';
import { PatternItem } from '@/feature/music/data/Music';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;
            const type = searchParams.get('type');
            const level = searchParams.get('level');

            if (!type || !level) {
                return NextResponse.json(
                    { detail: 'proper data not provided' },
                    { status: 400 },
                );
            }

            const result = (await prisma.$queryRaw`
            SELECT
                a.pid as patternId,
                a.musicid as musicId,
                b.title_en as titleEn,
                b.title_ko as titleKo,
                a.sdtype as sdtype,
                a.lv as level,
                a.steptype as steptype,
                a.difficulty as difficulty,
                b.songtype as songtype,
                b.removed as removed,
                b.version as version,
                a.newpattern as newpattern
            FROM pattern AS a
            JOIN (SELECT * FROM music where removed=0) AS b
            WHERE
                a.sdtype = ${type} AND
                a.musicid = b.musicid AND
                a.lv = ${level}`) as PatternItem[];

            return NextResponse.json(result);
        },
    });
};
