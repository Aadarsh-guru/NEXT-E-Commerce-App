'use client'
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Loader from '@/components/loaders/Loader';

const AccessProvider = ({ children }) => {
    const path = usePathname();
    const router = useRouter();
    const { data, status } = useSession();
    const [readyToRender, setReadyToRender] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userRole = data?.user?.role;
        if (userRole === 'user') {
            router.push('/account');
        } else {
            router.push(path);
        }
        setTimeout(() => {
            setLoading(false);
            setReadyToRender(true);
        }, 1000);
    }, [status, path, router, data]);

    return (
        <>
            {loading ? <Loader /> : readyToRender ? children : null}
        </>
    );
};

export default AccessProvider;



