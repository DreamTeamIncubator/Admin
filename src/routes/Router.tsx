import {Login} from '@/components/Login/Login';
import {Routes, Route, Navigate} from 'react-router-dom';
import MainLayout from '@/widgets/MainLayout/ui/MainLayout.tsx';
import {UserList} from '@/components/UserList/UserList.tsx';
import {Statistics} from '@/features/Statistics/Statistics.tsx';
import {PaymentsList} from '@/features/PaymentsList/PaymentsList.tsx';
import {PostsList} from '@/features/PostsList/PostsList.tsx';
import {RequireAuth} from '@/widgets/MainLayout/ui/RequireAuth.tsx';


const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<RequireAuth><MainLayout /></RequireAuth>}>
                <Route index element={<Navigate to="users" replace />} />
                <Route path="users" element={<UserList />} />
                <Route path="statistics" element={<Statistics />} />
                <Route path="payments-list" element={<PaymentsList />} />
                <Route path="posts-list" element={<PostsList />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRouter;

