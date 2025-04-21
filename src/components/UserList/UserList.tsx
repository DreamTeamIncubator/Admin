import {GET_USERS, REMOVE_USER} from '@/apollo/graphQL.ts'
import {useMutation, useQuery} from '@apollo/client'
import {ChangeEvent, useState} from 'react'
import {Input} from '@/components/Input/Input.tsx'
import {RadixSelect} from '@/components/Select/RadixSelect.tsx'
import s from './UserList.module.scss'
import {Pagination} from '@/components/Pagination/Pagination.tsx'
import {useBoolean} from '@/common/hooks/useBoolean.ts';
import {ModalRadix} from '@/components/Modal/ModalRadix.tsx';
import {Button} from '@/components/Button/Button.tsx';
import type {User} from '@/generated/graphql.ts';
import UserListItem from '@/components/UserList/UserListItem/UserListItem.tsx';
import {useDebounce} from '@/common/hooks/useDebounce.ts';

const selectOptions = [
    {value: 'Blocked', label: 'Blocked'},
    {value: 'Not Blocked', label: 'Not Blocked'},
]


export const UserList = () => {
    const [inputValue, setInputValue] = useState('')
    const [selectValue, setSelectValue] = useState(selectOptions[1])
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(5);
    const perPageOptions = [5, 10, 20, 50, 100]

    const {value: isOpenModal, setTrue: setIsOpened, setFalse: setIsClosed} = useBoolean()
    const [user, setUser] = useState<User | null>(null)
    const {value: isDisabled, setTrue: setIsDisabled, setFalse: setIsNotDisabled} = useBoolean()


    const {data, refetch} = useQuery(GET_USERS, {
        variables: {
            searchTerm: inputValue,
            pageSize: perPage,
            pageNumber: page,
            sortBy: 'createdAt',
            sortDirection: 'desc',
            statusFilter: 'ALL',
        }
    })

    //debounce
    const debouncedSearch = useDebounce((value: string) => {
        refetch({
            searchTerm: value,
            pageNumber: 1,
            pageSize: perPage
        })
    }, 3000)

    const [removeUser] = useMutation(REMOVE_USER);

    const totalCount = data?.getUsers?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / perPage);

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
        refetch({
            pageNumber: newPage,
            pageSize: perPage
        })
    }

    const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage)
        setPage(1)
        refetch({
            pageNumber: 1,
            pageSize: newPerPage
        })
    }

    const onChangeInputHandler = (value: string) => {
        setInputValue(value)
        setPage(1)

        debouncedSearch(value)
        // refetch({
        //     searchTerm: value,
        //     pageNumber: 1,
        //     pageSize: perPage
        // })
    }

    const onChangeSelectHandler = (value: any) => {
        setSelectValue(value)
        // Добавить логику фильтрации
    }

    const openDeleteModal = async (userId: number) => {
        const userToDelete = data?.getUsers?.users?.find((user: User) => user.id === userId);
        await setUser(userToDelete);
        setIsOpened()
    }

    const deleteHandler = async () =>  {
        try {
            setIsDisabled()
            await removeUser({variables: {userId: user?.id}})
            setIsClosed()
            setIsNotDisabled()
            refetch();
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div className={s.userListWrapper}>
            <div className={s.inputContainer}>
                <Input
                    value={inputValue}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeInputHandler(e.currentTarget.value)}
                    placeholder={'Search'}
                />
                <RadixSelect
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
                {data?.getUsers?.users?.map((user: User) =>  <UserListItem user={user} onDelete = {openDeleteModal} key={user.id}/>)}
            </div>

            <Pagination
                count={totalPages || 1}
                onChange={handlePageChange}
                page={page}
                perPage={perPage}
                perPageOptions={perPageOptions}
                onPerPageChange={handlePerPageChange}
            />
            <ModalRadix open={isOpenModal} onClose={setIsClosed} modalTitle={'Delete user'} size={'sm'} className={s.modal}>
                <div>Are you sure to delete user {user?.userName}?</div>
                <div className={s.buttonContainer} >
                    <Button variant={'primary'} onClick={setIsClosed}>No</Button>
                    <Button variant={'outlined'} onClick={deleteHandler} disabled={isDisabled}>Yes</Button>
                </div>
            </ModalRadix>
        </div>
    )
}


