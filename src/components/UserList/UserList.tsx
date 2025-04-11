import {GET_USERS} from '@/apollo/graphQL.ts';
import {useQuery} from '@apollo/client';
import {ChangeEvent, useState} from 'react';
import {Input} from '@/components/Input/Input.tsx';
import {RadixSelect} from '@/components/Select/RadixSelect.tsx';
import s from './UserList.module.scss';
import {Pagination} from '@/components/Pagination/Pagination.tsx';

const selectOptions = [
    { value: 'Blocked', label: 'Blocked' },
    { value: 'Not Blocked', label: 'Not Blocked' },
]

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
};

export const UserList = () => {
    const [inputValue, setInputValue] = useState('')
    const [selectValue, setSelectValue] = useState(selectOptions[1])
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(5);
    const perPageOptions = [5, 10, 20, 50, 100]

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
        refetch({
            searchTerm: value,
            pageNumber: 1,
            pageSize: perPage
        })
    }

    const onChangeSelectHandler = (value: any) => {
        setSelectValue(value)
        // Добавить логику фильтрации
    }

    const mappedUsers = data?.getUsers?.users?.map((el: any) => {
        return (
            <div className={s.user} key={el.id}>
                <div className={s.userId}>{el.id}</div>
                <div className={s.userName}>{el.userName}</div>
                <div className={s.profileLink}>{el.profile.userName}</div>
                <div className={s.dateAdded}>{formatDate(el.profile.createdAt)}</div>
                <div className={s.dots} onClick={()=>{}}>
                    <span></span>
                </div>
            </div>
        )
    })

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
                {mappedUsers}
            </div>

            <Pagination
                count={totalPages || 1}
                onChange={handlePageChange}
                page={page}
                perPage={perPage}
                perPageOptions={perPageOptions}
                onPerPageChange={handlePerPageChange}
            />
        </div>
    )
}
