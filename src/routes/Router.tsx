import {Login} from '@/components/Login/Login';
import {Routes, Route, Navigate} from 'react-router-dom';
import MainLayout from '@/widgets/MainLayout/ui/MainLayout.tsx';
import {Statistics} from '@/features/Statistics/Statistics.tsx';
import {PaymentsList} from '@/features/PaymentsList/PaymentsList.tsx';
import {PostsList} from '@/features/PostsList/PostsList.tsx';
import {RequireAuth} from '@/widgets/MainLayout/ui/RequireAuth.tsx';
import {MoreInformation} from '@/features/MoreInformation/MoreInformation';
import {UserList} from '@/features/UserList/UserList.tsx';
import {useTranslation} from 'react-i18next';

const AppRouter = () => {

    const { i18n } = useTranslation();
    const defaultLanguage = 'en';

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route
                path="/"
                element={
                    <RequireAuth>
                        <MainLayout />
                    </RequireAuth>
                }
            >
                <Route index element={<Navigate to="users" replace />} />
                <Route path="users" element={<UserList />} />
                <Route path="statistics" element={<Statistics />} />
                <Route path="payments-list" element={<PaymentsList />} />
                <Route path="posts-list" element={<PostsList />} />
                <Route path="moreInformation/:id" element={<MoreInformation />} />
            </Route>

            {/* Группа 2: Маршруты С языковым префиксом (для не-дефолтных языков) */}
            <Route path="/:lang/login" element={<Login />} />
            <Route
                path="/:lang/"
                element={
                    <RequireAuth>
                        <MainLayout />
                    </RequireAuth>
                }
            >
                <Route index element={<Navigate to="users" replace />} />
                <Route path="users" element={<UserList />} />
                <Route path="statistics" element={<Statistics />} />
                <Route path="payments-list" element={<PaymentsList />} />
                <Route path="posts-list" element={<PostsList />} />
                <Route path="moreInformation/:id" element={<MoreInformation />} />
            </Route>

            {/* Редиректы для обработки краевых случаев */}
            <Route
                path="*"
                element={
                    <Navigate
                        to={i18n.language === defaultLanguage
                            ? "/"
                            : `/${i18n.language}`
                        }
                        replace
                    />
                }
            />
        </Routes>
    );
};

export default AppRouter;
