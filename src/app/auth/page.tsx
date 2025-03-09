"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthPage = () => {
    const router = useRouter();
    useEffect(() => {
        router.push('/auth/login');
    }, [router]);

    return null;
};

export default AuthPage;