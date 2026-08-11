import {atom} from "jotai";
import Language from "../data/language";

export const atomLanguage = atom<string>(new Language().getLang());
