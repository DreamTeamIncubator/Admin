// import {GET_USERS, REMOVE_USER} from '@/apollo/graphQL.ts'
// import {useMutation, useQuery} from '@apollo/client'
// import {ChangeEvent, useState} from 'react'
// import {Input} from '@/components/Input/Input.tsx'
// import {RadixSelect} from '@/components/Select/RadixSelect.tsx'
// import s from './UserList.module.scss'
// import {Pagination} from '@/components/Pagination/Pagination.tsx'
// import {useBoolean} from '@/common/hooks/useBoolean.ts';
// import {ModalRadix} from '@/components/Modal/ModalRadix.tsx';
// import {Button} from '@/components/Button/Button.tsx';
// import type {User} from '@/generated/graphql.ts';
// import UserListItem from '@/components/UserList/UserListItem/UserListItem.tsx';
// import {useDebounce} from '@/common/hooks/useDebounce.ts';
//
// const selectOptions = [
//     {value: 'Blocked', label: 'Blocked'},
//     {value: 'Not Blocked', label: 'Not Blocked'},
// ]
//
//
// export const UserList = () => {
//     const [inputValue, setInputValue] = useState('')
//     const [selectValue, setSelectValue] = useState(selectOptions[1])
//     const [page, setPage] = useState(1)
//     const [perPage, setPerPage] = useState(8);
//     const perPageOptions = [8, 16, 32, 64, 128]
//
//     const {value: isOpenModal, setTrue: setIsOpened, setFalse: setIsClosed} = useBoolean()
//     const [user, setUser] = useState<User | null>(null)
//     const {value: isDisabled, setTrue: setIsDisabled, setFalse: setIsNotDisabled} = useBoolean()
//
//
//     const {data, refetch} = useQuery(GET_USERS, {
//         variables: {
//             searchTerm: inputValue,
//             pageSize: perPage,
//             pageNumber: page,
//             sortBy: 'createdAt',
//             sortDirection: 'desc',
//             statusFilter: 'ALL',
//         },
//     })
//
//     //debounce
//     const debouncedSearch = useDebounce((value: string) => {
//         refetch({
//             searchTerm: value,
//             pageNumber: 1,
//             pageSize: perPage
//         })
//     }, 3000)
//
//     const [removeUser] = useMutation(REMOVE_USER);
//
//     const totalCount = data?.getUsers?.pagination.totalCount || data?.getUsers?.totalCount || 0;
//     const totalPages = Math.ceil(totalCount / perPage);
//
//     const handlePageChange = (newPage: number) => {
//         setPage(newPage)
//         refetch({
//             pageNumber: newPage,
//             pageSize: perPage
//         })
//     }
//
//     const handlePerPageChange = (newPerPage: number) => {
//         setPerPage(newPerPage)
//         setPage(1)
//         refetch({
//             pageNumber: 1,
//             pageSize: newPerPage
//         })
//     }
//
//     const onChangeInputHandler = (value: string) => {
//         setInputValue(value)
//         setPage(1)
//
//         debouncedSearch(value)
//         // refetch({
//         //     searchTerm: value,
//         //     pageNumber: 1,
//         //     pageSize: perPage
//         // })
//     }
//
//     const onChangeSelectHandler = (value: any) => {
//         setSelectValue(value)
//         // Добавить логику фильтрации
//     }
//
//     const openDeleteModal = async (userId: number) => {
//         const userToDelete = data?.getUsers?.users?.find((user: User) => user.id === userId);
//         await setUser(userToDelete)
//         setIsOpened()
//     }
//
//     const deleteHandler = async () =>  {
//         try {
//             setIsDisabled()
//             await removeUser({variables: {userId: user?.id}})
//             setIsClosed()
//             setIsNotDisabled()
//             refetch()
//         } catch (e) {
//             console.log(e)
//         }
//     }
//
//
//     return (
//         <div className={s.userListWrapper}>
//             <div className={s.inputContainer}>
//                 <Input
//                     value={inputValue}
//                     onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeInputHandler(e.currentTarget.value)}
//                     placeholder={'Search'}
//                 />
//                 <RadixSelect
//                     className={s.selectFilter}
//                     contentClassName={s.selectContent}
//                     triggerClassName={s.selectTrigger}
//                     options={selectOptions}
//                     value={selectValue.value}
//                     onValueChange={(value) => onChangeSelectHandler(value)}
//                 />
//             </div>
//             <div className={s.headerContainer}>
//                 <div>User ID</div>
//                 <div>Username</div>
//                 <div>Profile link</div>
//                 <div>Date added</div>
//                 <div>Actions</div>
//             </div>
//
//             <div className={s.userList}>
//                 {data?.getUsers?.users?.map((user: User) =>  <UserListItem user={user} onDelete = {openDeleteModal} key={user.id} isBanned={user.userBan}/>
//                 )}
//             </div>
//
//             <Pagination
//                 count={totalPages || 1}
//                 onChange={handlePageChange}
//                 page={page}
//                 perPage={perPage}
//                 perPageOptions={perPageOptions}
//                 onPerPageChange={handlePerPageChange}
//             />
//
//             <ModalRadix
//                 className={s.modal}
//                 open={isOpenModal}
//                 onClose={setIsClosed}
//                 modalTitle={'Delete user'}
//                 style={{ background: 'red !important', padding: '20px' }}
//             >
//                 <p>
//                     Are you sure to delete user <b>{user?.userName}?</b></p>
//                 <div className={s.buttonContainer} >
//                     <Button variant={'primary'} onClick={setIsClosed}>No</Button>
//                     <Button variant={'outlined'} onClick={deleteHandler} disabled={isDisabled}>Yes</Button>
//                 </div>
//             </ModalRadix>
//         </div>
//     )
// }


// UserList.tsx
import {GET_USERS, REMOVE_USER, BAN_USER} from '@/apollo/graphQL.ts';
import {useMutation, useQuery} from '@apollo/client';
import {ChangeEvent, useCallback, useState} from 'react';
import {Input} from '@/components/Input/Input.tsx';
import {RadixSelect} from '@/components/Select/RadixSelect.tsx';
import s from './UserList.module.scss';
import {Pagination} from '@/components/Pagination/Pagination.tsx';
import type {User} from '@/generated/graphql.ts';
import {UserListItem} from '@/components/UserList/UserListItem/UserListItem.tsx';
import {useDebounce} from '@/common/hooks/useDebounce.ts';
import {LoadingBar} from '@/components/LoadingBar/LoadingBar.tsx';
import { NetworkStatus } from '@apollo/client';

const selectOptions = [
    {value: 'Blocked', label: 'Blocked'},
    {value: 'Not Blocked', label: 'Not Blocked'},
];

export const UserList = () => {
    const [inputValue, setInputValue] = useState('');
    const [selectValue, setSelectValue] = useState(selectOptions[1]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(8);
    const perPageOptions = [8, 16, 32, 64, 128];

    console.log('userList render')

    const {data, refetch, previousData, networkStatus } = useQuery(GET_USERS, {
        variables: {
            searchTerm: inputValue,
            pageSize: perPage,
            pageNumber: page,
            sortBy: 'createdAt',
            sortDirection: 'desc',
            statusFilter: 'ALL',
        },
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
    });

    const [removeUser] = useMutation(REMOVE_USER, {
        onCompleted: () => refetch(),
    });

    const [banUser] = useMutation(BAN_USER, {
        onCompleted: () => refetch(),
    });

    const debouncedSearch = useDebounce((value: string) => {
        refetch({
            searchTerm: value,
            pageNumber: 1,
            pageSize: perPage
        });
    }, 300);

    const onDeleteHandler = useCallback(async (userId: number) => {
        try {
            await removeUser({ variables: { userId } });
        } catch (e) {
            console.error(e);
        }
    }, [removeUser]);

    const onBanHandler = useCallback(async (userId: number, reason: string) => {
        try {
            await banUser({ variables: { userId, banReason: reason } });
        } catch (e) {
            console.error(e);
        }
    }, [banUser]);


    const usersData = data?.getUsers || previousData?.getUsers;
    const totalCount = usersData?.pagination?.totalCount || usersData?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / perPage);
    const users = usersData?.users || [];

    const onPageChangeHandler = (newPage: number) => {
        setPage(newPage);
        refetch({
            pageNumber: newPage,
            pageSize: perPage
        });
    };

    const onPerPageChangeHandler = (newPerPage: number) => {
        setPerPage(newPerPage);
        setPage(1);
        refetch({
            pageNumber: 1,
            pageSize: newPerPage
        });
    };

    const onChangeInputHandler = (value: string) => {
        setInputValue(value);
        setPage(1);
        debouncedSearch(value);
    };

    const onChangeSelectHandler = (value: any) => {
        setSelectValue(value);
        // Добавить логику фильтрации
    };

    const loading = networkStatus === NetworkStatus.loading && !data?.getUsers?.users;

    return (
        <div className={s.userListWrapper}>
            <div className={s.inputContainer}>
                <Input
                    value={inputValue}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeInputHandler(e.currentTarget.value)}
                    placeholder={'Search'}
                />
                <RadixSelect
                    className={s.selectFilter}
                    contentClassName={s.selectContent}
                    triggerClassName={s.selectTrigger}
                    options={selectOptions}
                    value={selectValue.value}
                    onValueChange={(value) => onChangeSelectHandler(value)}
                />
            </div>
            <div className={s.headerContainer}>
                <div>User ID</div>
                <div>Username</div>
                <div>Profile link</div>
                <div>Date added</div>
                <div>Actions</div>
            </div>
            <div className={s.userList}>
                {loading && <div className={s.overlay}><LoadingBar /></div>}
                {users.map((user: User) => (
                    <UserListItem
                        key={user.id}
                        user={user}
                        onDelete={onDeleteHandler}
                        onBan={onBanHandler}
                        isBanned={user.userBan}
                    />
                ))}
            </div>
            <Pagination
                count={totalPages || 1}
                onChange={onPageChangeHandler}
                page={page}
                perPage={perPage}
                perPageOptions={perPageOptions}
                onPerPageChange={onPerPageChangeHandler}
            />
        </div>
    );
};