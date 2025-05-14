import {useMutation, useQuery} from '@apollo/client';
import {useSubscription} from '@apollo/client/react/hooks';
import {useEffect, useRef, useState} from 'react';
import {BAN_USER, GET_POSTS, POST_ADDED} from '@/apollo/graphQL.ts';
import {Input} from '@/components/Input/Input.tsx';
import {PostItem} from '../Post/PostItem.tsx';
import s from './PostList.module.scss';
import {Post} from '@/generated/graphql.ts';
import {ModalRadix} from '@/components/Modal/ModalRadix.tsx';
import {useBoolean} from '@/common/hooks/useBoolean.ts';
import {BanReasonForm} from '@/features/UserList/ActionModal/BanReasonForm/BanReasonForm.tsx';
import {Button} from '@/components/Button/Button.tsx';


export const PostsList = () => {
    const lastPostRef = useRef<HTMLDivElement | null>(null);
    const [isFetching, setIsFetching] = useState(false);
    const {value, setTrue, setFalse} = useBoolean()
    const [userName, setUserName] = useState('')
    const [userId, setUserId] = useState<null | number>(null)
    const [banReason, setBanReason] = useState('')
    const [customBanReason, setCustomBanReason] = useState('')

    const {data, fetchMore, refetch} = useQuery(GET_POSTS, {
        variables: {endCursorPostId: 0},
        notifyOnNetworkStatusChange: true,
    });

    const [banUser] = useMutation(BAN_USER, {
        onCompleted: () => refetch()
    })

    // const {data: newPost,} = useSubscription(POST_ADDED, {
    //     onSubscriptionData: ({subscriptionData}) => {
    //         console.log('subscriptionData', subscriptionData);
    //         const newPost = subscriptionData.data?.postAdded;
    //         if (newPost) {
    //             refetch();
    //         }
    //     },
    // });
    const {data: newPost} = useSubscription(POST_ADDED, {
        onData: ({data}) => {
            const newPost = data?.data?.postAdded;
            if (newPost) {
                refetch();
            }
        },
    });


    const posts = data?.getPosts?.items || [];

    useEffect(() => {
        if (!lastPostRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isFetching && posts.length) {
                        const lastPostId = posts[posts.length - 1]?.id;
                        if (lastPostId) {
                            setIsFetching(true);
                            fetchMore({
                                variables: {endCursorPostId: lastPostId},
                            }).finally(() => setIsFetching(false));
                        }
                    }
                });
            },
            {threshold: 0.1}
        );

        observer.observe(lastPostRef.current);

        return () => observer.disconnect();
    }, [posts, isFetching, fetchMore]);


    const setUserNameHandler = (userName: string,) => {
        setTrue()
        setUserName(userName)
    }
    const setUserIdHandler = (userId: number | null) => {
        setTrue()
        setUserId(userId)
    }

    const onReasonChangeHandler = (value: string) => {
        setBanReason(value)
    }

    const onCustomReasonChangeHandler = (value: string) => {
        setCustomBanReason(value)
    }

    const onBanUser = async () => {
        try {
            console.log(userId, banReason)
            await banUser({variables: {userId, banReason}})
            setFalse()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className={s.container}>
            <Input placeholder="Search" variant="search"/>
            <div className={s.postsWrap}>
                {posts.map((post: Post, index: number) => {
                    const isLast = index === posts.length - 1;
                    return (
                        <div key={post.id} ref={isLast ? lastPostRef : null}>
                            <PostItem post={post} setUserName={setUserNameHandler} setUserId={setUserIdHandler}/>
                        </div>
                    );
                })}
            </div>
            {isFetching && <p>Loading..</p>}

            <ModalRadix open={value} onClose={setFalse} modalTitle={'Ban user'} className={s.modal}>
                <p className={s.text}>Are you sure to ban this user, {userName}?</p>
                <BanReasonForm reason={banReason} onReasonChange={onReasonChangeHandler} customReason={customBanReason}
                               onCustomReasonChange={onCustomReasonChangeHandler}/>
                <div className={s.buttonWrap}>
                    <Button variant={'primary'} onClick={setFalse} className={s.button}>No</Button>
                    <Button variant={'outlined'} onClick={onBanUser} className={s.button}>Yes</Button>
                </div>

            </ModalRadix>
        </div>
    );
};
