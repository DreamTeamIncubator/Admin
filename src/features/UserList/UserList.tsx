import { GET_USERS } from '@/apollo/graphQL.ts'
import { NetworkStatus, useQuery } from '@apollo/client'
import { ChangeEvent, useState } from 'react'
import { Input } from '@/components/Input/Input.tsx'
import { RadixSelect } from '@/components/Select/RadixSelect.tsx'
import type { User } from '@/generated/graphql.ts'
import { useDebounce } from '@/common/hooks/useDebounce.ts'
import { LoadingBar } from '@/components/LoadingBar/LoadingBar.tsx'
import { UserListItem } from '@/features/UserList/UserListItem/UserListItem.tsx'
import s from './UserList.module.scss'
import { Pagination } from '@/components/Pagination/Pagination.tsx'
import { SortIcon } from '@/components/SortIcon/SortIcon'

const selectOptions = [
  { value: 'Blocked', label: 'Blocked' },
  { value: 'Not Blocked', label: 'Not Blocked' },
]

export const UserList = () => {
  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState(selectOptions[1])
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(8)
  const perPageOptions = [8, 16, 32, 64, 128]

  const { data, refetch, previousData, networkStatus, variables } = useQuery(GET_USERS, {
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
  })

  //debounce
  const debouncedSearch = useDebounce((value: string) => {
    refetch({
      searchTerm: value,
      pageNumber: 1,
      pageSize: perPage,
    })
  }, 3000)

  const usersData = data?.getUsers || previousData?.getUsers
  const totalCount = usersData?.pagination?.totalCount || usersData?.totalCount || 0
  const totalPages = Math.ceil(totalCount / perPage)
  const users = usersData?.users || []

  const onPageChangeHandler = (newPage: number) => {
    setPage(newPage)
    refetch({
      pageNumber: newPage,
      pageSize: perPage,
    })
  }

  const onPerPageChangeHandler = (newPerPage: number) => {
    setPerPage(newPerPage)
    setPage(1)
    refetch({
      pageNumber: 1,
      pageSize: newPerPage,
    })
  }

  const onChangeInputHandler = (value: string) => {
    setInputValue(value)
    setPage(1)
    debouncedSearch(value)
  }

  // const onChangeSelectHandler = (value: any) => {
  //     setSelectValue(value)
  //     // Добавить логику фильтрации
  // }

  const loading = networkStatus === NetworkStatus.loading && !data?.getUsers?.users

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

  return (
    <div className={s.userListWrapper}>
      <div className={s.inputContainer}>
        <Input
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChangeInputHandler(e.currentTarget.value)
          }
          placeholder={'Search'}
        />
        <RadixSelect
          className={s.selectFilter}
          contentClassName={s.selectContent}
          triggerClassName={s.selectTrigger}
          options={selectOptions}
          value={selectValue.value}
          onValueChange={(value) => handleSortBy(value)}
        />
      </div>
      <div className={s.headerContainer}>
        <div>User ID </div>
        <div>
          Username{' '}
          <SortIcon
            active={variables?.sortBy === 'userName'}
            direction={variables?.sortDirection}
            onClick={() => handleSortBy('userName')}
          />
        </div>
        <div>Profile link</div>
        <div>
          {' '}
          Date added{' '}
          <SortIcon
            active={variables?.sortBy === 'createdAt'}
            direction={variables?.sortDirection}
            onClick={() => handleSortBy('createdAt')}
          />
        </div>
        <div>Actions</div>
      </div>
      <div className={s.userList}>
        {loading && (
          <div className={s.overlay}>
            <LoadingBar />
          </div>
        )}
        {users.map((user: User) => (
          <UserListItem key={user.id} user={user} refetch={refetch} isBanned={user.userBan} />
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
  )
}
