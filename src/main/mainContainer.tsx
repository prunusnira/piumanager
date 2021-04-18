import React from 'react';
import Language from '../piutable/language';
import Main from './main';

const MainContainer = () => {
    const lang = new Language().getLang();
    return (<Main lang={lang} />);
}

export default MainContainer;