import ProfileInfo from '@/components/account/profile/ProfileInfo'
import React from 'react'

export const metadata = {
    title: `Profile - ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: 'this is the Profile page',
}

const Profile = () => {
    return (
        <ProfileInfo />
    )
}

export default Profile