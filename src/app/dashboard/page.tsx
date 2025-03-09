"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';

const DashboardPage: React.FC = () => {

    const router = useRouter()
    const auth = useAuth();
    const {role} = auth || {};

    useEffect(() => {
        if (role) {
            if(role === 'admin'){
            router.replace('/admin-dashboard');
            }
            else if(role === 'team_owner'){
            router.replace('/user-dashboard');
            }
        }
    }
    , [role]);

    return (
        <ProtectedRoute availableFor={['team_owner','admin' , 'user']} >
        <div>
            <h1>Dashboard</h1>
            <p>User Role: {role}</p>
            <p>Redirecting...</p>
        </div>
        </ProtectedRoute>
    );
};

export default DashboardPage;