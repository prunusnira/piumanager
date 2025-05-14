import { PatternType } from '../data/TableTypes';

interface ParsedPattern {
    type: PatternType;
    number: number;
    isPlus?: boolean;
}

const PATTERN_LIMITS = {
    SINGLE: { min: 13, max: 26 },
    DOUBLE: { min: 13, max: 28 },
    COOP: { min: 2, max: 5 },
} as const;

/**
 * 셀렉터의 value 값을 파싱하여 구조화된 객체로 변환
 */
export const parsePatternValue = (value: string): ParsedPattern | null => {
    if (!value || value === 'none') return null;

    // SINGLE (s13 ~ s26)
    if (value.startsWith('s')) {
        const number = parseInt(value.slice(1));
        if (number <= 12) return null;
        return {
            type: 'SINGLE',
            number: Math.min(number, PATTERN_LIMITS.SINGLE.max),
        };
    }

    // DOUBLE (d13 ~ d28)
    if (value.startsWith('d')) {
        const number = parseInt(value.slice(1));
        if (number <= 12) return null;
        return {
            type: 'DOUBLE',
            number: Math.min(number, PATTERN_LIMITS.DOUBLE.max),
        };
    }

    // COOP (coopx2 ~ coopx5plus)
    if (value.startsWith('coop')) {
        const numberPart = value.slice(5); // 'coopx'를 제거
        const isPlus = numberPart.endsWith('plus');
        const number = parseInt(isPlus ? numberPart.slice(0, -4) : numberPart);

        if (number < PATTERN_LIMITS.COOP.min) return null;

        if (number > PATTERN_LIMITS.COOP.max) {
            return {
                type: 'COOP',
                number: PATTERN_LIMITS.COOP.max,
                isPlus: true,
            };
        }

        return {
            type: 'COOP',
            number,
            isPlus,
        };
    }

    return null;
};

/**
 * 구조화된 패턴 객체를 셀렉터의 value 형식으로 변환
 */
export const formatToPatternValue = (pattern: ParsedPattern): string | null => {
    // 숫자가 12 이하인 경우 null 반환
    if (pattern.number <= 12 && pattern.type !== 'COOP') return null;
    if (pattern.type === 'COOP' && pattern.number < PATTERN_LIMITS.COOP.min)
        return null;

    switch (pattern.type) {
        case 'SINGLE':
            return `s${Math.min(pattern.number, PATTERN_LIMITS.SINGLE.max)}`;
        case 'DOUBLE':
            return `d${Math.min(pattern.number, PATTERN_LIMITS.DOUBLE.max)}`;
        case 'COOP':
            if (pattern.number > PATTERN_LIMITS.COOP.max) {
                return `coopx${PATTERN_LIMITS.COOP.max}plus`;
            }
            return `coopx${pattern.number}${pattern.isPlus ? 'plus' : ''}`;
    }
};

/**
 * 패턴을 사람이 읽기 쉬운 형식으로 변환
 */
export const formatToReadablePattern = (
    pattern: ParsedPattern,
): string | null => {
    // 숫자가 12 이하인 경우 null 반환
    if (pattern.number <= 12 && pattern.type !== 'COOP') return null;
    if (pattern.type === 'COOP' && pattern.number < PATTERN_LIMITS.COOP.min)
        return null;

    switch (pattern.type) {
        case 'SINGLE':
            return `${pattern.type} ${Math.min(pattern.number, PATTERN_LIMITS.SINGLE.max)}`;
        case 'DOUBLE':
            return `${pattern.type} ${Math.min(pattern.number, PATTERN_LIMITS.DOUBLE.max)}`;
        case 'COOP':
            if (pattern.number > PATTERN_LIMITS.COOP.max) {
                return `${pattern.type} x${PATTERN_LIMITS.COOP.max}+`;
            }
            return `${pattern.type} x${pattern.number}${pattern.isPlus ? '+' : ''}`;
    }
};

/**
 * 사람이 읽기 쉬운 형식을 셀렉터의 value 형식으로 변환
 */
export const readableToPatternValue = (readable: string): string | null => {
    // "SINGLE 13" 형식
    const singleMatch = readable.match(/^SINGLE\s+(\d+)$/i);
    if (singleMatch) {
        const number = parseInt(singleMatch[1]);
        if (number <= 12) return null;
        return `s${Math.min(number, PATTERN_LIMITS.SINGLE.max)}`;
    }

    // "DOUBLE 13" 형식
    const doubleMatch = readable.match(/^DOUBLE\s+(\d+)$/i);
    if (doubleMatch) {
        const number = parseInt(doubleMatch[1]);
        if (number <= 12) return null;
        return `d${Math.min(number, PATTERN_LIMITS.DOUBLE.max)}`;
    }

    // "COOP x5+" 또는 "COOP x2" 형식
    const coopMatch = readable.match(/^COOP\s+x(\d+)(\+)?$/i);
    if (coopMatch) {
        const number = parseInt(coopMatch[1]);
        if (number < PATTERN_LIMITS.COOP.min) return null;
        if (number > PATTERN_LIMITS.COOP.max) {
            return `coopx${PATTERN_LIMITS.COOP.max}plus`;
        }
        return `coopx${number}${coopMatch[2] ? 'plus' : ''}`;
    }

    return null;
};
