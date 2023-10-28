import RegisterForm from '@/components/auth/RegisterForm'
import React from 'react'

export const metadata = {
    title: `Register - ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: 'this is the Register page',
}

const Register = () => {
    return (
        <div className="">
            <RegisterForm />
        </div>
    )
}

export default Register