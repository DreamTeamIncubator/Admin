import {GET_PAYMENTS} from '@/apollo/graphQL.ts'
import { useQuery} from '@apollo/client'
import {ChangeEvent, useState} from 'react'
import {Input} from '@/components/Input/Input.tsx'
import styles from './../../components/UserList/UserList.module.scss'
import s from './PaymentsList.module.scss'
import {Pagination} from '@/components/Pagination/Pagination.tsx'
import {useDebounce} from '@/common/hooks/useDebounce.ts';
import { SubscriptionPaymentsModel } from '@/generated/graphql'
import { PaymentsListItem } from './PaymentsListItem/PaymentsListItem'


type GetPaymentsQuery = {
  getPayments: {
    items: SubscriptionPaymentsModel[];
    totalCount: number;
    page: number;
    pageSize: number;
    pagesCount: number;
  };
};

type GetPaymentsQueryVariables = {
  searchTerm?: string;
  pageSize?: number;
  pageNumber?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
};


export const PaymentsList = () => {
    const [inputValue, setInputValue] = useState('')
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(6)
    const perPageOptions = [6]
    const [sortBy, setSortBy] = useState<string>('createdAt')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')


    const { data, refetch } = useQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(GET_PAYMENTS, {
        variables: {
          searchTerm: inputValue,
          pageSize: perPage,
          pageNumber: page,
          sortBy,
          sortDirection,
        }
      });
      

    //debounce
    const debouncedSearch = useDebounce((value: string) => {
        refetch({
            searchTerm: value,
            pageNumber: 1,
            pageSize: perPage
        })
    }, 3000)


    const totalCount = data?.getPayments?.totalCount || 0;
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
    }

    const handleSort = (field:string) => {
        const isSameField = sortBy === field
        const newDirection = isSameField && sortDirection === 'asc' ? 'desc' : 'asc'

        setSortBy(field)
        setSortDirection(newDirection)
        setPage(1)

         refetch({
            searchTerm: inputValue,
            pageNumber: 1,
            pageSize:perPage,
            sortBy:field, 
            sortDirection:newDirection
         })
    }

    return (
        <div className={styles.userListWrapper}>
            <div className={styles.inputContainer}>
                <Input
                    className={s.input}
                    value={inputValue}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeInputHandler(e.currentTarget.value)}
                    placeholder={'Search'}
                />
            </div>
            <div className={s.headerContainer}>
                <div className={s.iconFilterWrapper}>
                    Username 
                    <img src={'/Filter.svg'} onClick={()=>handleSort('userName')}/>
                </div>

                <div className={s.iconFilterWrapper}  onClick={()=>handleSort('createdAt')}>
                    Date added
                    <img src={'/Filter.svg'}/>
                </div>

                <div className={s.iconFilterWrapper}>
                    Amount,$
                    <img src={'/Filter.svg'} onClick={()=>handleSort('amount')}/>
                </div>

                <div>Subscription</div>

                <div className={s.iconFilterWrapper}>
                    Payment method
                    <img src={'/Filter.svg'} onClick={()=>handleSort('paymentMethod')}/>
                </div>
            </div>
          
           <div>
             {data?.getPayments?.items.map((item)=>(<PaymentsListItem key={item.id} user={item}/>))}
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

