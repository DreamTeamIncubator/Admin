import {Outlet} from 'react-router-dom';
import s from './mainLayout.module.scss'
import {Sidebar} from '@/widgets/Sidebar/Sidebar.tsx';

export default function MainLayout() {
    return (
        <div className={s.mainlayout}>
            <Sidebar />
            <main className={s.main}>
                <Outlet />
            </main>
        </div>
    );
}
