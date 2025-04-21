import { Pagination } from '@/components/Pagination/Pagination';
import s from './Payments.module.scss';
import { useState } from 'react';

import { useQuery } from '@apollo/client';
import { GET_PAYMENTS_BY_USER } from '@/apollo/graphQL';

type PaymentsProps = {
  id: number;
};

type Response = {
  dateOfPayment: Date;
  endDate: Date;
  price: number;
  type: string;
  paymentType: string;
};

export const Payments = ({ id }: PaymentsProps) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const perPageOptions = [5, 10, 20, 50, 100];

  const { data, refetch } = useQuery(GET_PAYMENTS_BY_USER, {
    variables: {
      userId: id,
      pageSize: perPage,
      pageNumber: page,
      sortBy: 'createdAt',
      sortDirection: 'desc',
    },
  });

  const totalCount = data?.getPaymentsByUser?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / perPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    refetch({
      pageNumber: newPage,
      pageSize: perPage,
    });
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setPage(1);
    refetch({
      pageNumber: 1,
      pageSize: newPerPage,
    });
  };

  return (
    <div className={s.paymentsList}>
      <div className={s.header}>
        <div>Date of Payment</div>
        <div>End date of subscription</div>
        <div>Amount, $</div>
        <div>Subscription Type</div>
        <div>Payment Type</div>
      </div>
      {data?.getPaymentsByUser?.items?.length === 0 && <div>No payments</div>}
      {data?.getPaymentsByUser?.items?.map((item: Response, index: number) => {
        const subscriptionType = item.type === 'WEEKLY' ? '7 day' : item.type === 'MONTHLY' ? '1 month' : '1 day';
        return (
          <div key={index} className={s.paymentList}>
            <div>{item.dateOfPayment ? new Date(item.dateOfPayment).toLocaleDateString('ru-RU') : ''}</div>
            <div>{item.endDate ? new Date(item.endDate).toLocaleDateString('ru-RU') : ''}</div>
            <div>${item.price}</div>
            <div>{subscriptionType}</div>
            <div>{item.paymentType}</div>
          </div>
        );
      })}
      <Pagination
        count={totalPages || 1}
        onChange={handlePageChange}
        page={page}
        perPage={perPage}
        perPageOptions={perPageOptions}
        onPerPageChange={handlePerPageChange}
      />
    </div>
  );
};
