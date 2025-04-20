import { SubscriptionPaymentsModel } from "@/generated/graphql"
import s from './../PaymentsList.module.scss'
import { formatDate } from "@/components/UserList/UserListItem/UserListItem"


type Props = {
    user: SubscriptionPaymentsModel
}

export const PaymentsListItem = ({user}:Props)=> {
    const avatarUrl = user.avatars?.[0]?.url || undefined

     return(
        <div className={s.user}>
            <div className={s.userAvatarContainer}>
                <img src={avatarUrl} alt="User avatar" className={s.avatar} />
                <div className={s.text}>{user.userName}</div>
            </div>
            <div className={s.text}>{formatDate(user.createdAt)}</div>
            <div className={s.text}>{user.amount}$</div>
            <div className={s.text}>{user.type}</div>
            <div className={s.text}>{user.paymentMethod}</div>
        </div>
     )
}