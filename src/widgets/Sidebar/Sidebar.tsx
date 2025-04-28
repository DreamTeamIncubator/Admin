import {NavLink} from 'react-router-dom';
import {UserIcon} from '@/assets/UserIcon.tsx';
import {StatisticIcon} from '@/assets/StatisticIcon.tsx';
import {PaymentIcon} from '@/assets/PaymentIcon.tsx';
import {PostIcon} from '@/assets/PostIcon.tsx';
import {useTranslation} from 'react-i18next';
import s from './Sidebar.module.scss';

export const Sidebar = () => {

    const { t } = useTranslation();

    const className = ({ isActive }: {isActive: boolean}) => {
        return   isActive ? `${s.active} ${s.link}`  : s.link
    }

    return (
        <div className={s.sidebarWrapper}>
            <nav>
                <ul className={s.navigation}>
                    <li>
                        <NavLink to="users" className={className}>
                            <UserIcon/>
                            <span>{t('sideBar.usersList')}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="statistics" className={className}>
                            <StatisticIcon/>
                            <span>{t('sideBar.statistics')}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="payments-list" className={className}>
                            <PaymentIcon/>
                            <span>{t('sideBar.paymentsList')}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="posts-list" className={className}>
                            <PostIcon/>
                            <span>{t('sideBar.postsList')}</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};