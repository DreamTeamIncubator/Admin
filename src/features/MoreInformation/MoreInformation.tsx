import { GET_USER } from '@/apollo/graphQL';
import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import arrowBack from './../../assets/arrowBack.svg';
import s from './MoreInformation.module.scss';
import * as Tabs from '@radix-ui/react-tabs';

import { UploadedPhotos } from './UploadedPhotos/UploadedPhotos';
import { Payments } from './Payments/Payments';
import { Followers } from './Followers/Followers';
import { Following } from './Following/Following';

export const MoreInformation = () => {
  const path = useParams();
  const id = Number(path?.id);

  const { data } = useQuery(GET_USER, {
    variables: { userId: id },
  });

  return (
    <div className={s.container}>
      <div className={s.header}>
        <Link to="/" className={s.link}>
          <img src={arrowBack} alt="arrow back" />
          <p>Back to Users List</p>
        </Link>
        <div className={s.userInfo}>
          <img src={data?.getUser?.profile?.avatars?.[0]?.url} />
          <div>
            <div>
              <span>
                {data?.getUser?.profile?.firstName} {data?.getUser?.profile?.lastName}
              </span>
              <span></span>
            </div>
            <Link to={`http://localhost:3000/public-profile/${data?.getUser?.id}`}>{data?.getUser?.userName}</Link>
          </div>
        </div>
        <div className={s.profileInfo}>
          <div>
            <p>UserID</p>
            <span>{data?.getUser?.id}</span>
          </div>
          <div>
            <p>Profile Creation Date</p>
            <span>{data?.getUser?.createdAt ? new Date(data.getUser.createdAt).toLocaleDateString('ru-RU') : ''}</span>
          </div>
        </div>
      </div>
      <div>
        <Tabs.Root className={s.tabsRoot} defaultValue="UploadedPhotos">
          <Tabs.List className={s.tabsList} color="indigo">
            <Tabs.Trigger className={s.tabTrigger} value="UploadedPhotos">
              Uploaded photos
            </Tabs.Trigger>
            <Tabs.Trigger className={s.tabTrigger} value="Payments">
              Payments
            </Tabs.Trigger>
            <Tabs.Trigger className={s.tabTrigger} value="Followers">
              Followers
            </Tabs.Trigger>
            <Tabs.Trigger className={s.tabTrigger} value="Following">
              Following
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content className={s.tabContent} value="UploadedPhotos">
            <UploadedPhotos id={id} />
          </Tabs.Content>

          <Tabs.Content className={s.tabContent} value="Payments">
            <Payments id={id} />
          </Tabs.Content>
          <Tabs.Content className={s.tabContent} value="Followers">
            <Followers id={id} />
          </Tabs.Content>
          <Tabs.Content className={s.tabContent} value="Following">
            <Following id={id} />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
};
