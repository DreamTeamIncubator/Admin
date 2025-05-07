import {LocaleType} from '@/locales/en.ts';

export const ru: LocaleType = {
    sideBar: {
        usersList: 'Список пользователей',
        statistics: 'Статистика',
        paymentsList: 'Список платежей',
        postsList: 'Список постов',
    },
    usersList: {
        table: {
            userId: 'ID пользователя',
            username: 'Имя пользователя',
            profileLink: 'Ссылка на профиль',
            dateAdded: 'Дата добавления',
            actions: 'Действия',
        },
        input: {
            placeholder: 'Поиск',
        },
        select: {
            all: 'Все',
            blocked: 'Заблокированные',
            notBlocked: 'Не заблокированные',
        },
        popover: {
            delete: 'Удалить пользователя',
            ban: 'Забанить пользователя',
            unban: 'Разбанить пользователя',
            moreInformation: 'Дополнительныя информация',
        },
        modal: {
            delete: {
                title: 'Удалить пользователя',
                description: 'Вы уверены, что хотите удалить пользователя',
            },
            ban: {
                title: 'Забанить пользователя',
                description: 'Вы уверены, что хотите забанить пользователя',
                reasonSelect: {
                    placeholder: 'Выберите причину',
                    options: {
                        behavior: 'Плохое поведение',
                        advertising: 'Размещение рекламы',
                        another: 'Другая причина',
                    },
                },
                textarea: {
                    placeholder: 'Укажите свою причину',
                },
            },
            unban: {
                title: 'Разбанить пользователя',
                description: 'Вы уверены, что хотите разбанить пользователя',
            },
        },
    },
    paymentsList: {
        username: 'Имя пользователя',
        dateAdded: 'Дата добавления',
        amount: 'Сумма',
        subscription: 'Подписка',
        paymentMethod: 'Способ оплаты',
    },
    pagination: {
        show: 'Показать',
        onPage: 'на странице',
    },
    common: {
        button: {
            confirm: 'Да',
            cancel: 'Нет',
            signUp: 'Регистрация',
            login: 'Вход',
        }
    },
    languageSelect: {
        en: 'Английский',
        ru: 'Русский',
    },
}