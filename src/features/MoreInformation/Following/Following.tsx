import { Pagination } from '@/components/Pagination/Pagination';
import s from './Following.module.scss';
import { useState } from 'react';

import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_FOLLOWING } from '@/apollo/graphQL';

type FollowingProps = {
  id: number;
};

type Response = {
  createdAt: Date;
  id: number;
  userId: number;
  userName: string;
};

export const Following = ({ id }: FollowingProps) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const perPageOptions = [5, 10, 20, 50, 100];

  const { data, refetch } = useQuery(GET_FOLLOWING, {
    variables: {
      pageSize: perPage,
      pageNumber: page,
      sortBy: 'createdAt',
      sortDirection: 'desc',
      userId: id,
    },
  });
  console.log(data);

  const totalCount = data?.getFollowing?.totalCount || 0;
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
    <div className={s.followingList}>
      <div className={s.header}>
        <div>User ID</div>
        <div>Username</div>
        <div>Profile link</div>
        <div>Subscription Date</div>
      </div>
      {data?.getFollowing?.items?.length === 0 && <div>Following list is empty</div>}
      {data?.getFollowing?.items?.map((item: Response) => {
        return (
          <div key={item.id} className={s.followingList}>
            <div>{id}</div>
            <div>{item.userName}</div>
            <Link to={`http://localhost:3000/public-profile/${item.id}`}>{item.userName}</Link>
            <div>{item.createdAt ? new Date(item.createdAt).toLocaleDateString('ru-RU') : ''}</div>
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
