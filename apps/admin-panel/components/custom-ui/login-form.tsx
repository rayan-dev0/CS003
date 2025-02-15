"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { z } from 'zod';
import { signIn } from 'next-auth/react';

const formValidation = z.object({
    username: z.string().min(2, "Username must atleast be 2 chars long"),
    password: z.string().min(6, "Password must be atleast 6 chars long")
});


const LoginForm: React.FC = () => {

    const [viewPassword, setViewPassword] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formValidation>>({
        resolver: zodResolver(formValidation),
        defaultValues: {
            username: "",
            password: ""
        }
    });

    const onLogin = async (values: z.infer<typeof formValidation>) => {
        try {
            const loginData = await signIn('credentials', {
                username: values.username,
                password: values.password,
                redirectTo: "/dashboard"
            });
        } catch (error) {
            console.error("Invalid Credentials" + error);
        }
    }

    return (
        <div className='flex justify-center items-center mt-[20rem]'>
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
                                        <Input className=' w-[20rem]' type={viewPassword ? 'password' : 'text'} placeholder='Password' {...field} />
                                    </FormControl>
                                    <Button type='button' className='ml-2 ' variant="ghost" onClick={(e) => { e.stopPropagation(); setViewPassword(!viewPassword) }}>
                                        {
                                            viewPassword ? (
                                                <FaEyeSlash />
                                            ) : (
                                                <FaEye />
                                            )
                                        }
                                    </Button>
                                    <FormMessage />
                                </div>
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
