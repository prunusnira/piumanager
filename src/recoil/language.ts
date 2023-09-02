import {atom} from "recoil";
import Language from "../data/language";

export const atomLanguage = atom<string>({
    key: 'atomLanguage',
    default: new Language().getLang(),
})