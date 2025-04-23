// import s from './UserListItem.module.scss';
// import * as Popover from '@radix-ui/react-popover';
// import dotsIcon from '@/assets/dotsIcon.svg';
// import deleteIcon from '@/assets/deleteUser.svg';
// import banIcon from '@/assets/banUser.svg';
// import type {User, UserBan} from '@/generated/graphql.ts';
// import unbanIcon from '../../../assets/unban.svg';
// import {useMutation} from '@apollo/client';
// import {BAN_USER, GET_USERS} from '@/apollo/graphQL.ts';
// import {ModalRadix} from '@/components/Modal/ModalRadix.tsx';
// import {useBoolean} from '@/common/hooks/useBoolean.ts';
// import {RadixSelect} from '@/components/Select/RadixSelect.tsx';
// import {Button} from '@/components/Button/Button.tsx';
// import {useState} from 'react';
// import {TextArea} from '@/components/Textarea/TextArea.tsx';
// import client from '@/apollo/apolloClient.ts';
//
// const options = [
//     {value: 'Bad behavior', label: 'Bad behavior'},
//     {value: 'Advertising placement', label: 'Advertising placement'},
//     {value: 'Another reason', label: 'Another reason'},
// ]
//
// const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//
//     return `${day}.${month}.${year}`;
// };
//
// type Props = {
//     user: User
//     onDelete: (userId: number) => void
//     isBanned?: UserBan | null
// }
//
// const UserListItem = ({user, onDelete, isBanned}: Props) => {
//
//     const [banUser] = useMutation(BAN_USER, {
//             async onCompleted() {
//                 await client.refetchQueries({include: [GET_USERS]})
//             }
//         }
//         //     {
//         //     update(cache, { data: { userBan } }) {
//         //         cache.modify({
//         //             id: cache.identify({__typename: 'User', id: user.id}),
//         //             fields: {
//         //                 userBan() {
//         //                     return userBan
//         //                 }
//         //             }
//         //         })
//         //     }
//         // }
//     )
//
//     const {value: isOpen, setTrue: setOpened, setFalse: setClosed} = useBoolean()
//     const [selectOption, setSelectOption] = useState<{ value: string; label: string } | null>(null);
//     const [textAreaValue, setTextAreaValue] = useState('')
//     const [showTextarea, setShowTextarea] = useState(false)
//
//     const onBanHandler = async () => {
//         await banUser({variables: {banReason: selectOption?.value, userId: user.id}})
//         setClosed()
//     }
//
//     const onSelectChangeHandler = (value: string) => {
//         const selectedOption = options.find(option => option.value === value);
//         if (selectedOption) {
//             setSelectOption(selectedOption ?? null)
//             setShowTextarea(value === 'Another reason');
//         }
//     }
//
//     const setClosedAndReset = () => {
//         setClosed()
//         setSelectOption(null)
//     }
//
//     const onChangeTextAreHandler = (value: string) => {
//         setTextAreaValue(value)
//     }
//
//     return (
//         <>
//             <div className={s.user} key={user.id}>
//                 <div className={s.userId}>
//                     {isBanned?.__typename === 'UserBan' && <img src={banIcon} className={s.banBadge} alt={'User ban'}/>}
//                     {user.id}
//                 </div>
//                 <div className={s.userName}>{user.userName}</div>
//                 <div className={s.profileLink}>{user.profile.userName}</div>
//                 <div className={s.dateAdded}>{formatDate(user.profile.createdAt)}</div>
//                 <div>
//                     <Popover.Root>
//                         <Popover.Trigger asChild>
//                             <img src={dotsIcon} alt={'banIcon'} className={s.dotsIcon}/>
//                         </Popover.Trigger>
//
//                         <Popover.Content className={s.popoverContainer}>
//                             <div className={s.popoverItem} onClick={() => onDelete(user.id)}>
//                                 <img src={deleteIcon} alt={'deleteIcon'}/>
//                                 <span>Delete User</span>
//                             </div>
//                             {isBanned?.__typename === 'UserBan'
//                                 ?
//                                 <div className={s.popoverItem} onClick={setOpened}>
//                                     <img src={unbanIcon} alt={'unbanIcon'}/>
//                                     <span>Un-ban User</span>
//                                 </div>
//                                 :
//
//                                 <div className={s.popoverItem} onClick={setOpened}>
//                                     <img src={banIcon} alt={'banIcon'}/>
//                                     <span>Ban in the system</span>
//                                 </div>
//                             }
//
//                             <div className={s.popoverItem} onClick={() => {
//                             }}>
//                                 <img src={dotsIcon} alt={'banIcon'}/>
//                                 <span>More Information</span>
//                             </div>
//                         </Popover.Content>
//                     </Popover.Root>
//                 </div>
//             </div>
//
//             <ModalRadix
//                 open={isOpen}
//                 onClose={setClosedAndReset}
//                 modalTitle={'Ban user'}
//                 className={s.modalBanUser}
//             >
//                 <p>Are you sure to ban this user, {' '}
//                     <b>{user.userName}?</b>
//                 </p>
//                 <div className={s.selectContainer}>
//                     <RadixSelect
//                         contentClassName={s.selectContent}
//                         options={options}
//                         onValueChange={onSelectChangeHandler}
//                         value={selectOption?.value || ''}
//                         className={s.select}
//                         placeholder={'Select reason'}
//                         itemClassName={s.selectItem}
//                     />
//                 </div>
//
//                 <div className={`${s['textarea-animator']} ${showTextarea ? s.visible : ''}`}>
//                     {showTextarea && (
//                         <TextArea
//                             value={textAreaValue}
//                             onChange={(e) => onChangeTextAreHandler(e.currentTarget.value)}
//                             className={s.textarea}
//                         />
//                     )}
//                 </div>
//
//                 <div className={s.buttonContainer}>
//                     <Button variant={'primary'} onClick={setClosedAndReset}>No</Button>
//                     <Button variant={'outlined'} onClick={onBanHandler}>Yes</Button>
//                 </div>
//
//             </ModalRadix>
//         </>
//     );
// };
//
// export default UserListItem;

import s from './UserListItem.module.scss';
import * as Popover from '@radix-ui/react-popover';
import dotsIcon from '@/assets/dotsIcon.svg';
import deleteIcon from '@/assets/deleteUser.svg';
import banIcon from '@/assets/banUser.svg';
import type {User, UserBan} from '@/generated/graphql.ts';
import unbanIcon from '../../../assets/unban.svg';
import {useState} from 'react';
import {BanReasonForm} from '@/components/UserList/ActionModal/BanReasonForm/BanReasonForm.tsx';
import {ActionModal} from '@/components/UserList/ActionModal/ActionModal.tsx';

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
};
