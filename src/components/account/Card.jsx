import Link from 'next/link'
import React from 'react'
import './Card.css'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'


const Card = ({ item, setLoading, email }) => {

    const router = useRouter()

    const handleClink = async () => {
        if (item?.name === 'Sign Out') {
            await signOut()
        } else if (item?.name === 'Become Seller') {
            try {
                setLoading(true)
                const response = await fetch(`/api/user/update`, {
                    method: 'PATCH',
                    body: JSON.stringify({ email: email })
                })
                response && setLoading(false)
                const responseData = await response.json()
                if (responseData?.success) {
                    toast.success(responseData.message)
                    router.push('/dashboard')
                } else {
                    toast.success(responseData.message)
                }
            } catch (error) {
                setLoading(false)
                console.log(error);
                toast.error('something went wrong.')
            }
        }
    }

    return (
        <div className="w-full flex justify-center items-center">
            <div onClick={() => handleClink()} className="card  rounded-md transform duration-200 hover:scale-110 hover:shadow-sm transition-transform active:scale-95">
                <Link className="card1" href={item?.url ? item.url : '#'}>
                    <p className='pb-2 font-bold text-black' >{item?.name}</p>
                    <p className="small">{item?.desc}</p>
                    <div className="go-corner">
                        <div className="go-arrow">
                            →
                        </div>
                    </div>
                </Link>
            </div>
        </div >
    )
}

export default Card