import s from './UserListItem.module.scss'
import * as Popover from '@radix-ui/react-popover';
import dotsIcon from '@/assets/dotsIcon.svg';
import deleteIcon from '@/assets/deleteUser.svg';
import banIcon from '@/assets/banUser.svg';
import type {User, UserBan} from '@/generated/graphql.ts';
import unbanIcon from '../../../assets/unban.svg';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {useMutation} from '@apollo/client';
import {BAN_USER, REMOVE_USER, UNBAN_USER} from '@/apollo/graphQL.ts';
import {formatDate} from '@/utils/utils.ts';
import {BanReasonForm} from '@/features/UserList/ActionModal/BanReasonForm/BanReasonForm.tsx';
import {ActionModal} from '@/features/UserList/ActionModal/ActionModal.tsx';

type Props = {
    user: User
    refetch: () => void
    isBanned?: UserBan | null
};

export const UserListItem = ({user, refetch, isBanned}: Props) => {
    const [activeModal, setActiveModal] = useState<'delete' | 'ban' | 'unban' | null>(null);
    const [banReason, setBanReason] = useState('');
    const [customBanReason, setCustomBanReason] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const route = useNavigate();
    const handleMoreInformation = (id: number) => {
        route(`/moreInformation/${id}`);
    };

    const [banUser] = useMutation(BAN_USER, {
        onCompleted: () => refetch()
    })
    const [unban] = useMutation(UNBAN_USER)
    const [removeUser] = useMutation(REMOVE_USER, {
        onCompleted: () => refetch()
    })

    const handleBanReasonChange = (value: string) => {
        setBanReason(value)
        setErrorMessage('')
    }
    const handleCustomBanReasonChange = (value: string) => {
        setCustomBanReason(value)
        setErrorMessage('')
    }

    const handleActionConfirm = async (actionType: 'delete' | 'ban' | 'unban') => {
        if (actionType === 'ban' && (!banReason || (banReason === 'Another reason' && !customBanReason))) {
            setErrorMessage('Please select or enter a ban reason.');
            return;
        }
        setErrorMessage('');
        setIsLoading(true);
        try {
            if (actionType === 'delete') {
                await removeUser({variables: {userId: user.id}});
            } else if (actionType === 'ban') {
                const reason = banReason === 'Another reason' ? customBanReason : banReason;
                await banUser({variables: {userId: user.id, banReason: reason}})
            } else if (actionType === 'unban') {
                await  unban({
                    variables: {
                        userId: user.id
                    }
                })
                refetch()
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
        },
        unban: {
            title: 'Un-ban user',
            description: (
                <p>Are you sure to un-ban user <b>{user.userName}</b>?</p>
            )
        },
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
                        <div className={s.popoverItem} onClick={() => isBanned ? setActiveModal('unban') : setActiveModal('ban')}>
                            <img src={isBanned ? unbanIcon : banIcon} alt="Ban"/>
                            <span>{isBanned ? 'Un-ban' : 'Ban'} User</span>
                        </div>
                        <div className={s.popoverItem} onClick={() => handleMoreInformation(user.id)}>
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
    )}
