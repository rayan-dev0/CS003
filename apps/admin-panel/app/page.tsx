import LoginForm from '@/components/custom-ui/login/login-form';
import React from 'react';

const Login: React.FC = async () => {
    return (
        <main className='flex flex-col items-center justify-center h-screen w-full'>
            <LoginForm />
        </main>
    )
}

export default Login;