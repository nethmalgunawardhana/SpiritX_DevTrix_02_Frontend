"use client";

import { useAuth } from '@/context/AuthContext';
import React from 'react';

const DashboardPage: React.FC = () => {

    const auth = useAuth();
    const {role} = auth || {};

    return (
        <div>
            <h1>Dashboard</h1>
            <p>User Role: {role}</p>
        </div>
    );
};

export default DashboardPage;