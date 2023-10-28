import AccountInfo from '@/components/account/AccountInfo'
import React from 'react'

export const metadata = {
    title: `Account - ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: 'this is the account page',
}

const Account = async () => {

    return (
        <>
            <AccountInfo />
        </>
    )
}

export default Account