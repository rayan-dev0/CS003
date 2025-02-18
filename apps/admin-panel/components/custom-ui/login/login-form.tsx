"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { loginFormValidation } from '@/lib/zod';
import { CircleUserRound, Eye, EyeOff, LockKeyhole } from 'lucide-react';

const LoginForm: React.FC = () => {

    const [viewPassword, setViewPassword] = useState<boolean>(false);

    const form = useForm<z.infer<typeof loginFormValidation>>({
        resolver: zodResolver(loginFormValidation),
        defaultValues: {
            username: "",
            password: ""
        }
    });

    const onLogin = async (values: z.infer<typeof loginFormValidation>) => {
        try {
            await signIn('credentials', {
                username: values.username,
                password: values.password,
                redirectTo: "/dashboard"
            });
        } catch (error) {
            console.error("Invalid Credentials" + error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onLogin)} className='border px-20 py-10 rounded-lg shadow-md'>
                <h2 className='text-3xl text-center'>Admin Login</h2>
                <div className='my-2'>
                    <FormDescription className='text-center'>
                        Enter account credentials provided through your email
                    </FormDescription>
                </div>
                <hr className='mb-7' />
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }: { field: any }) => (
                        <FormItem>
                            <label className='text-[12px]' htmlFor="username">Username</label>
                            <FormControl>
                                <article className="relative group">
                                    <CircleUserRound strokeWidth={1} className="text-gray-500 absolute top-[6px] left-2 group-focus-within:text-black transition-colors" />
                                    <Input className="pl-10 focus:ring-1 focus:ring-black" name="username" type="text" placeholder="Admin Username" {...field} />
                                </article>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <label className='text-[12px]' htmlFor="password">Password</label>
                            <div className='relative'>
                                <FormControl>
                                    <article className="relative group">
                                        <LockKeyhole strokeWidth={1} size={19} className="text-gray-500 absolute top-[8px] left-2 group-focus-within:text-black transition-colors" />
                                        <Input className="pl-10 focus:ring-1 focus:ring-black" type={viewPassword ? 'text' : 'password'} placeholder='Admin Password' {...field} />
                                    </article>
                                </FormControl>
                                <div className='absolute right-3 cursor-pointer top-2 hover:bg-white' onClick={(e) => { e.stopPropagation(); setViewPassword(!viewPassword) }}>
                                    {
                                        viewPassword ? (
                                            <EyeOff size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )
                                    }
                                </div>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit' className='mt-8 w-full text-md font-semibold'>
                    Login
                </Button>
            </form>
        </Form>
    )
}

export default LoginForm;
