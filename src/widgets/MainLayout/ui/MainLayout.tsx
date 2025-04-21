import {NavLink, Outlet} from 'react-router-dom';
import s from './mainLayout.module.scss'
import {UserIcon} from '@/assets/UserIcon.tsx';
import {StatisticIcon} from '@/assets/StatisticIcon.tsx';
import {PostIcon} from '@/assets/PostIcon.tsx';
import {PaymentIcon} from '@/assets/PaymentIcon.tsx';


export default function MainLayout() {
    const className = ({ isActive }: {isActive: boolean}) => {
        return   isActive ? `${s.active} ${s.link}`  : s.link
    }

    return (
        <div className={s.mainlayout}>
            <aside>
                <nav >
                    <ul className={s.navigation}>
                        <li >
                            <NavLink to="users" className={className}>
                                <UserIcon />
                                <span>Users list</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="statistics" className={className}>
                                <StatisticIcon/>
                                <span>Statistics</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="payments-list" className={className}>
                                <PaymentIcon/>
                                <span>Payments list</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="posts-list" className={className}>
                                <PostIcon/>
                                <span>Posts list</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

// className={`svgIcon ${isActive ? 'active' : ''} ${className}`}