import s from './Sidebar.module.scss';
import { Link } from 'react-router-dom';

const navItems = [
  { label: 'Users list', icon: '', href: '/' },
  { label: 'Statistics', icon: '', href: '/' },
  { label: 'Payments list', icon: '', href: '/' },
  { label: 'Posts list', icon: '', href: '/' },
];

export default function Sidebar() {
  return (
    <aside className={s.sidebar}>
      <nav className={s.nav}>
        {navItems.map((item) => (
          <Link key={item.label} to={item.href} className={s.link}>
            {item.icon}
            <span className={s.text}>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
