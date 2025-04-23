import { GET_USERS, REMOVE_USER } from '@/apollo/graphQL.ts'
import { useMutation, useQuery } from '@apollo/client'
import { ChangeEvent, useState } from 'react'
import { Input } from '@/components/Input/Input.tsx'
import { RadixSelect } from '@/components/Select/RadixSelect.tsx'
import s from './UserList.module.scss'
import { Pagination } from '@/components/Pagination/Pagination.tsx'
import { useBoolean } from '@/common/hooks/useBoolean.ts'
import { ModalRadix } from '@/components/Modal/ModalRadix.tsx'
import { Button } from '@/components/Button/Button.tsx'
import type { User } from '@/generated/graphql.ts'
import UserListItem from '@/components/UserList/UserListItem/UserListItem.tsx'

import { useDebounce } from '@/common/hooks/useDebounce.ts'
import { SortIcon } from '../SortIcon/SortIcon'
const selectOptions = [
  { value: 'Blocked', label: 'Blocked' },
  { value: 'Not Blocked', label: 'Not Blocked' },
]

export const UserList = () => {
    const [inputValue, setInputValue] = useState('');
    const [selectValue, setSelectValue] = useState(selectOptions[1]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(8);
    const perPageOptions = [8, 16, 32, 64, 128];

  const { value: isOpenModal, setTrue: setIsOpened, setFalse: setIsClosed } = useBoolean()
  const [user, setUser] = useState<User | null>(null)
  const { value: isDisabled, setTrue: setIsDisabled, setFalse: setIsNotDisabled } = useBoolean()

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
  const { data, refetch, variables } = useQuery(GET_USERS, {
    variables: {
      searchTerm: inputValue,
      pageSize: perPage,
      pageNumber: page,
      sortBy: 'createdAt',
      sortDirection: 'desc',
      statusFilter: 'ALL',
    },
  })

  //debounce
  const debouncedSearch = useDebounce((value: string) => {
    refetch({
      searchTerm: value,
      pageNumber: 1,
      pageSize: perPage,
    })
  }, 3000)
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

  const [removeUser] = useMutation(REMOVE_USER)
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
  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage)
    setPage(1)
    refetch({
      pageNumber: 1,
      pageSize: newPerPage,
    })
  }

  const handleSortBy = (sortBy: string) => {
    const newDirection =
      variables?.sortBy === sortBy ? (variables.sortDirection === 'asc' ? 'desc' : 'asc') : 'asc'

    refetch({
      ...variables,
      sortBy,
      sortDirection: newDirection,
      pageNumber: 1,
    })
  }

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