import s from '@/components/UserList/UserList.module.scss';
import * as Popover from '@radix-ui/react-popover';
import dotsIcon from '@/assets/dotsIcon.svg';
import deleteIcon from '@/assets/deleteUser.svg';
import banIcon from '@/assets/banUser.svg';
import type {User} from '@/generated/graphql.ts';

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
};

type Props = {
    user: User
    onDelete: (userId: number) => void
}

const UserListItem = ({user, onDelete}: Props) => {
    return (
        <div className={s.user} key={user.id}>
            <div className={s.userId}>{user.id}</div>
            <div className={s.userName}>{user.userName}</div>
            <div className={s.profileLink}>{user.profile.userName}</div>
            <div className={s.dateAdded}>{formatDate(user.profile.createdAt)}</div>
            <div>
                <Popover.Root>
                    <Popover.Trigger asChild>
                        <img src={dotsIcon} alt={'banIcon'} className={s.dotsIcon}/>
                    </Popover.Trigger>

                    <Popover.Content className={s.popoverContainer}>
                        <div className={s.popoverItem} onClick={()=>onDelete(user.id)}>
                            <img src={deleteIcon} alt={'deleteIcon'}/>
                            <span>Delete User</span>
                        </div>
                        <div className={s.popoverItem} onClick={() => {}}>
                            <img src={banIcon} alt={'banIcon'}/>
                            <span>Ban in the system</span>
                        </div>
                        <div className={s.popoverItem} onClick={() => {}}>
                            <img src={dotsIcon} alt={'banIcon'}/>
                            <span>More Information</span>
                        </div>
                    </Popover.Content>
                </Popover.Root>
            </div>
        </div>
    );
};

export default UserListItem;