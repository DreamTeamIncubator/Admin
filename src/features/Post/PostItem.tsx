import s from './Post.module.scss'
import banIcon from '@/assets/banUser.svg';
import type {Post} from '@/generated/graphql.ts';
import { formatPostDate} from '@/utils/utils.ts';
import {NoAvatarIcon} from '@/assets/NoAvatarIcon.tsx';
import {Swiper} from 'swiper/react';
import {Navigation, Pagination} from 'swiper/modules';
import {SwiperSlide} from 'swiper/react';
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'


type Props = {
    post: Post
    setUserName: (userName: string) => void
    setUserId: (userId: number | null) => void
}

export const PostItem = ({post, setUserName, setUserId}: Props) => {

   const setUserNameHandler = (userName: string, userId: number) => {
       setUserName(userName)
       setUserId(userId)
   }


    const time = formatPostDate(post.createdAt)
    const avatar =  post?.postOwner?.avatars?.length &&post?.postOwner?.avatars?.length > 0 ? post.postOwner?.avatars?.[0].url : null
    return (
        <div className={s.container}>
            {/* slider*/}
            {post?.images?.length === 1
                ?
                <img src={post?.images[0]?.url} alt={'photo-post'} className={s.image}/>
                :
                <Swiper
                    className={s.slider}
                    modules={[Navigation, Pagination]}
                    spaceBetween={10}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    navigation
                >
                    {post?.images.map((src, index) => (
                        <SwiperSlide key={src.url}>
                            <img src={src.url} alt={`photo-${index}`} className="w-full h-auto object-cover" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            }
            <div className={s.avatarLine}>
                <div>
                    {avatar ?  <img src={avatar} alt={'avatar'} className={s.avatarIcon}/> : <NoAvatarIcon width={36} height={36}  className={s.avatarIcon}/>}
                    <a>{post.postOwner.userName}</a>
                </div>
                { !post.userBan?.reason && <img src={banIcon} alt={'ban-icon'} className={s.banIcon} onClick={()=>setUserNameHandler(post.postOwner.userName, post.ownerId)}/> }

            </div>
            <p className={s.time}>{time}</p>
            <p className={s.description}>{post.description}</p>
        </div>
    );
};

