"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { sellerValidation } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CircleUserRound, Eye, EyeOff, Handshake, LockKeyhole, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { UpdateSellerFormProps } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

const UpdateSellerForm: React.FC<UpdateSellerFormProps> = ({ closeRef, sellerData }) => {

    const [viewPassword, setViewPassword] = useState<boolean>(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof sellerValidation>>({
        resolver: zodResolver(sellerValidation),
        defaultValues: {
            username: sellerData.username,
            email: sellerData.email,
            password: sellerData.password,
            phoneNumber: sellerData.phoneNumber,
            businessName: sellerData.businessName,
            businessAddress: sellerData.businessAddress,
            // @ts-ignore 
            businessType: sellerData.businessType
        }
    });

    const updateSeller = async (newData: z.infer<typeof sellerValidation>) => {
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URI}/seller/update-seller/${sellerData._id}`, newData, {
                headers: {
                    "Content-Type": "application/json",
                    "adminKey": `Bearer-${process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY}`
                }
            });
            toast({
                title: "Success",
                description: `${newData.username}'s data was updated successfully`,
                action: (
                    <ToastAction altText='Close'>Close</ToastAction>
                )
            })
            closeRef.current?.click();
        } catch (error) {
            console.error("Error posting seller data" + error);
            toast({
                title: "Action Failed",
                description: "Unable to updated seller's data",
                action: (
                    <ToastAction altText='Close'>Close</ToastAction>
                )
            })
        }
    }

    return (
        <Form {...form}>
            <form className='flex flex-col gap-3' onSubmit={form.handleSubmit(updateSeller)}>
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }: { field: any }) => (
                        <FormItem>
                            <label className='text-[12px]' htmlFor="username">Username</label>
                            <FormControl>
                                <article className="relative group">
                                    <CircleUserRound strokeWidth={1} className="text-gray-500 absolute top-[6px] left-2 group-focus-within:text-black transition-colors" />
                                    <Input className="pl-10 focus:ring-1 focus:ring-black" name="username" type="text" placeholder="Seller Username" {...field} />
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
                                        <Input className="pl-10 focus:ring-1 focus:ring-black" type={viewPassword ? 'text' : 'password'} placeholder='Seller Account Password' {...field} />
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
                <aside className='flex gap-3 items-center w-full'>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }: { field: any }) => (
                            <FormItem className='w-full'>
                                <label className='text-[12px]' htmlFor="email">Email</label>
                                <FormControl>
                                    <article className="relative group">
                                        <Mail strokeWidth={1} size={19} className="text-gray-500 absolute top-[8px] left-2 group-focus-within:text-black transition-colors" />
                                        <Input className="pl-10 focus:ring-1 focus:ring-black" name='email' type='email' placeholder='Seller Email Address' {...field} />
                                    </article>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='phoneNumber'
                        render={({ field }: { field: any }) => (
                            <FormItem className='w-full'>
                                <label className='text-[12px]' htmlFor="phoneNumber">Phone No.</label>
                                <FormControl>
                                    <article className="relative group">
                                        <Phone strokeWidth={1} size={19} className="text-gray-500 absolute top-[8px] left-2 group-focus-within:text-black transition-colors" />
                                        <Input className="pl-10 focus:ring-1 focus:ring-black" name='phoneNumber' type='text' placeholder='Seller Phone Number' {...field} />
                                    </article>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </aside>
                <aside className='flex gap-3 items-center w-full'>
                    <FormField
                        control={form.control}
                        name='businessName'
                        render={({ field }: { field: any }) => (
                            <FormItem className='w-full'>
                                <label className='text-[12px]' htmlFor="email">Business Name</label>
                                <FormControl>
                                    <article className="relative group">
                                        <Handshake strokeWidth={1} size={19} className="text-gray-500 absolute top-[8px] left-2 group-focus-within:text-black transition-colors" />
                                        <Input className="pl-10 focus:ring-1 focus:ring-black" name='businessName' type='text' placeholder='Seller Business Name' {...field} />
                                    </article>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='businessType'
                        render={({ field }: { field: any }) => (
                            <FormItem className='w-full'>
                                <label className='text-[12px]' htmlFor="businessType">Business Type</label>
                                <FormControl>
                                    <Select name='businessType' {...field}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Choose Business Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Business Types</SelectLabel>
                                                {
                                                    ["Retail", "Wholesale", "Manufacturer", "Service", "Product", "Consultancy"].map(type => (
                                                        <SelectItem key={type} value={type}>
                                                            {type}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </aside>
                <FormField
                    control={form.control}
                    name='businessAddress'
                    render={({ field }: { field: any }) => (
                        <FormItem className='w-full flex flex-col'>
                            <label className='text-[12px]' htmlFor="email">Business Address</label>
                            <FormControl>
                                <textarea rows={3} placeholder='Seller Business Address' className='w-full rounded-md border resize-none border-neutral-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' name='businessAddress' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>
                    Update Seller Data
                </Button>
            </form>
        </Form>
    )
}

export default UpdateSellerForm;