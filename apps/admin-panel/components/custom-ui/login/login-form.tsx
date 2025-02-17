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
import { Eye, EyeOff } from 'lucide-react';

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
        <div className='flex justify-center items-center h-screen'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onLogin)}>
                    <p className='text-3xl'>Admin Login</p>
                    <div className='my-5'>
                        <FormDescription>
                            Log in to unlock and know more about your users
                        </FormDescription>
                    </div>
                    <FormField
                        control={form.control}
                        name='username'
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <label htmlFor="">Username</label>
                                <FormControl>
                                    <Input className='mt-2 w-[20rem]' type='text' placeholder='Username' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem className='mt-4'>
                                <label htmlFor="">Password</label>
                                <div className='flex items-center'>
                                    <FormControl>
                                        <Input className=' w-[20rem]' type={viewPassword ? 'text' : 'password'} placeholder='Password' {...field} />
                                    </FormControl>
                                    <Button type='button' className='ml-2 ' variant="ghost" onClick={(e) => { e.stopPropagation(); setViewPassword(!viewPassword) }}>
                                        {
                                            viewPassword ? (
                                                <EyeOff />
                                            ) : (
                                                <Eye />
                                            )
                                        }
                                    </Button>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='submit' className='mt-8 w-[20rem] text-md font-semibold'>
                        Login
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default LoginForm;
