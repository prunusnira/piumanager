import Language from "./language";

describe('기본 언어 설정 테스트', () => {
    const lang = new Language();
    const basicLang = lang.getLang();
    it('기본 언어 테스트', () => {
        expect(basicLang).toEqual('en');
    });

    it('언어 변경 테스트', () => {
        lang.createCookie('lang', 'ko', 1);
        expect(lang.readCookie('lang')).toEqual('ko');
    });

    it('쿠키 삭제 테스트', () => {
        lang.eraseCookie('lang');
        expect(lang.readCookie('lang')).toBeNull();
    });
});