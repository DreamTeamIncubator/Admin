import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ApolloProvider} from '@apollo/client';
import client from '@/apollo/apolloClient.ts';
import {BrowserRouter} from 'react-router-dom';
import './i18n/i18n.ts'  // импорт обязательно нужен, чтобы инициализировать i18next до того, как отрендерится приложение.

createRoot(document.getElementById('root')!).render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </ApolloProvider>
)
