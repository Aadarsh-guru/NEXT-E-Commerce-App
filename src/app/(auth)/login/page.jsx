import LoginForm from '@/components/auth/LoginForm'
import React from 'react'

export const metadata = {
    title: `Login - ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: 'this is the login page',
}

const Login = () => {
    return (
        <div className="">
            <LoginForm />
        </div>
    )
}

export default Login