import s from '@/components/UserList/UserList.module.scss';
import * as Popover from '@radix-ui/react-popover';
import dotsIcon from '@/assets/dotsIcon.svg';
import deleteIcon from '@/assets/deleteUser.svg';
import banIcon from '@/assets/banUser.svg';
import type {User, UserBan} from '@/generated/graphql.ts';
import unbanIcon from '../../../assets/unban.svg';
import {useState} from 'react';
import {BanReasonForm} from '@/components/UserList/ActionModal/BanReasonForm/BanReasonForm.tsx';
import {ActionModal} from '@/components/UserList/ActionModal/ActionModal.tsx';
import type { User } from '@/generated/graphql.ts';
import { useNavigate } from 'react-router-dom';

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
};

type Props = {
    user: User
    onDelete: (userId: number) => Promise<void>
    onBan: (userId: number, reason: string) => Promise<void>
    isBanned?: UserBan | null
};

export const UserListItem = ({user, onDelete, onBan, isBanned}: Props) => {
    const [activeModal, setActiveModal] = useState<'delete' | 'ban' | null>(null);
    const [banReason, setBanReason] = useState('');
    const [customBanReason, setCustomBanReason] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    console.log('userListItem render')

    const handleBanReasonChange = (value: string) => {
        setBanReason(value)
        setErrorMessage('')
    }
    const handleCustomBanReasonChange = (value: string) => {
        setCustomBanReason(value)
        setErrorMessage('')
    }

    const handleActionConfirm = async (actionType: 'delete' | 'ban') => {
        if (actionType === 'ban' && (!banReason || (banReason === 'Another reason' && !customBanReason))) {
            setErrorMessage('Please select or enter a ban reason.');
            return;
        }

        setErrorMessage('');

        setIsLoading(true);
        try {
            if (actionType === 'delete') {
                await onDelete(user.id);
            } else if (actionType === 'ban') {
                const reason = banReason === 'Another reason' ? customBanReason : banReason;
                await onBan(user.id, reason);
            }
            setActiveModal(null);
        } finally {
            setIsLoading(false);
        }
    };

    const modalContent = {
        delete: {
            title: 'Delete user',
            description: (
                <p>Are you sure to delete user <b>{user.userName}</b>?</p>
            )
        },
        ban: {
            title: isBanned ? 'Un-ban user' : 'Ban user',
            description: (
                <p>Are you sure to {isBanned ? 'un-ban' : 'ban'} user <b>{user.userName}</b>?</p>
            ),
            formFields: !isBanned && (
                <>
                    <BanReasonForm
                        reason={banReason}
                        onReasonChange={handleBanReasonChange}
                        customReason={customBanReason}
                        onCustomReasonChange={handleCustomBanReasonChange}
                    />
                    {errorMessage && <div className={s.errorMessage}>{errorMessage}</div>}
                </>

            ),
        }
    };

    return (
        <div className={s.user}>
            <div className={s.userId}>
                {isBanned?.__typename === 'UserBan' && <img src={banIcon} className={s.banBadge} alt="Banned"/>}
                {user.id}
            </div>
            <div className={s.userName}>{user.userName}</div>
            <div className={s.profileLink}>{user.profile.userName}</div>
            <div className={s.dateAdded}>{formatDate(user.profile.createdAt)}</div>
            <div>
                <Popover.Root>
                    <Popover.Trigger asChild>
                        <img src={dotsIcon} alt="Actions" className={s.dotsIcon}/>
                    </Popover.Trigger>
                    <Popover.Content className={s.popoverContainer}>
                        <div className={s.popoverItem} onClick={() => setActiveModal('delete')}>
                            <img src={deleteIcon} alt="Delete"/>
                            <span>Delete User</span>
                        </div>
                        <div className={s.popoverItem} onClick={() => setActiveModal('ban')}>
                            <img src={isBanned ? unbanIcon : banIcon} alt="Ban"/>
                            <span>{isBanned ? 'Un-ban' : 'Ban'} User</span>
                        </div>
                        <div className={s.popoverItem} onClick={() => {
                        }}>
                            <img src={dotsIcon} alt={'banIcon'}/>
                            <span>More Information</span>
                        </div>
                    </Popover.Content>
                </Popover.Root>
            </div>

            {activeModal && (
                <ActionModal
                    isOpen={!!activeModal}
                    onClose={() => setActiveModal(null)}
                    onConfirm={() => handleActionConfirm(activeModal)}
                    content={modalContent[activeModal]}
                    isLoading={isLoading}
                />
            )}
        </div>
    )
const UserListItem = ({ user, onDelete }: Props) => {
  const route = useNavigate();
  const handleMoreInformation = (id: number) => {
    route(`/moreInformation/${id}`);
  };
  return (
    <div className={s.user} key={user.id}>
      <div className={s.userId}>{user.id}</div>
      <div className={s.userName}>{user.userName}</div>
      <div className={s.profileLink}>{user.profile.userName}</div>
      <div className={s.dateAdded}>{formatDate(user.profile.createdAt)}</div>
      <div>
        <Popover.Root>
          <Popover.Trigger asChild>
            <img src={dotsIcon} alt={'banIcon'} className={s.dotsIcon} />
          </Popover.Trigger>

          <Popover.Content className={s.popoverContainer}>
            <div className={s.popoverItem} onClick={() => onDelete(user.id)}>
              <img src={deleteIcon} alt={'deleteIcon'} />
              <span>Delete User</span>
            </div>
            <div className={s.popoverItem} onClick={() => {}}>
              <img src={banIcon} alt={'banIcon'} />
              <span>Ban in the system</span>
            </div>
            <div className={s.popoverItem} onClick={() => handleMoreInformation(user.id)}>
              <img src={dotsIcon} alt={'banIcon'} />
              <span>More Information</span>
            </div>
          </Popover.Content>
        </Popover.Root>
      </div>
    </div>
  );
};
