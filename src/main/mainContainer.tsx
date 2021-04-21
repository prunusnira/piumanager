import React from 'react';
import Language from '../table/data/language';
import Main from './main';
import './piuCustom.css';

const MainContainer = () => {
    const lang = new Language().getLang();
    return (<Main lang={lang} />);
}

export default MainContainer;