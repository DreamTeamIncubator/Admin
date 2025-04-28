import './App.css';
import {Header} from './components/Header/Header.tsx';
import AppRouter from './routes/Router.tsx';
import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useTranslation} from 'react-i18next';


function App() {

    const location = useLocation();
    const { i18n } = useTranslation();

    useEffect(() => {
        const langFromUrl = location.pathname.split('/')[1];
        if (['en', 'ru'].includes(langFromUrl)) {
            i18n.changeLanguage(langFromUrl);
        }
    }, [location.pathname]);

    return (
        <>
            <Header/>
            <AppRouter/>
        </>
    );
}

export default App;
