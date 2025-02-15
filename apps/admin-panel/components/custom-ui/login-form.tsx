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
import { useRouter } from 'next/navigation';

const formValidation = z.object({
    username: z.string().min(2, "Username must atleast be 2 chars long"),
    password: z.string().min(6, "Password must be atleast 6 chars long")
});


const LoginForm: React.FC = () => {

    const [viewPassword, setViewPassword] = useState<boolean>(false);
    const router = useRouter();

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
                redirectTo: "/"
            });
        } catch (error) {
            console.error("Invalid Credentials" + error);
        }
    }

    return (
        <Form { ...form}>
            <form onSubmit={form.handleSubmit(onLogin)}>
                <FormDescription>
                    Admin Login
                </FormDescription>
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type='text' placeholder='Username' {...field} />
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
                            <FormControl>
                                <Input type={viewPassword ? 'password': 'text'} placeholder='Password' {...field} />
                            </FormControl>
                            <Button type='button' onClick={(e) => {e.stopPropagation(); setViewPassword(!viewPassword)}}>
                                {
                                    viewPassword ? (
                                        <FaEyeSlash />
                                    ) : (
                                        <FaEye />
                                    )
                                }
                            </Button>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>
                    Login
                </Button>
            </form>
        </Form>
    )
}

export default LoginForm;
