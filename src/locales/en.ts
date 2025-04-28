export const en = {
    sideBar: {
        usersList: 'Users list',
        statistics: 'Statistics',
        paymentsList: 'PaymentList',
        postsList: 'Posts list',
    },
    usersList: {
        table: {
            userId: 'User ID',
            username: 'Username',
            profileLink: 'Profile link',
            dateAdded: 'Date added',
            actions: 'Actions',
        },
        input: {
            placeholder: 'Search',
        },
        select: {
            all: 'All',
            blocked: 'Blocked',
            notBlocked: 'Not blocked',
        },
        popover: {
            delete: 'Delete user',
            ban: 'Ban user',
            unban: 'Unban user',
            moreInformation: 'More information',
        },
        modal: {
            delete: {
                title: 'Delete User',
                description: 'Are you sure you want to delete user',
            },
            ban: {
                title: 'Ban User',
                description: 'Are you sure you want to ban user',
                reasonSelect: {
                    placeholder: 'Select a reason',
                    options: {
                        behavior: 'Bad behavior',
                        advertising: 'Advertising placement',
                        another: 'Another reason',
                    },
                },
                textarea: {
                    placeholder: 'Enter custom reason',
                },
            },
            unban: {
                title: 'Unban User',
                description: 'Are you sure you want to unban user',
            },
        },
    },
    paymentsList: {
        username: 'Username',
        dateAdded: 'Date added',
        amount: 'Amount',
        subscription: 'Subscription',
        paymentMethod: 'Payment method',
    },
    pagination: {
        show: 'Show',
        onPage: 'on page',
    },
    common: {
        button: {
            confirm: 'Yes',
            cancel: 'No',
            signUp: 'Sign Up',
            login: 'Login',
        }
    },
    languageSelect: {
        en: 'English',
        ru: 'Russian',
    },
}

export type LocaleType = typeof en;