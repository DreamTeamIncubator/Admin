import { GET_POSTS_BY_USER } from '@/apollo/graphQL';
import { useQuery } from '@apollo/client';
import s from './UploadedPhotos.module.scss';

type UploadedPhotosProps = {
  id: number;
};

export const UploadedPhotos = ({ id }: UploadedPhotosProps) => {
  const { data } = useQuery(GET_POSTS_BY_USER, {
    variables: { userId: id, endCursorId: 0 },
  });

  return (
    <div className={s.container}>
      {data?.getPostsByUser?.items.length === 0 && <p>No uploaded photos</p>}
      {data?.getPostsByUser?.items.map((photo: { url: string }, index: number) => {
        return <img key={index} src={photo?.url} alt="photo" className={s.photo} />;
      })}
    </div>
  );
};
