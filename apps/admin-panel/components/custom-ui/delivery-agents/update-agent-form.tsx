"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { agentValidation } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CircleUserRound, Eye, EyeOff, LockKeyhole, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { UpdateDeliveryAgentFormProps } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import Select from "react-select";

const UpdateDeliveryAgentForm: React.FC<UpdateDeliveryAgentFormProps> = ({ closeRef, deliveryAgentData }) => {

    const [viewPassword, setViewPassword] = useState<boolean>(false);
    const { toast } = useToast();

    const sellerOptions = [
        {
            label: "s1",
            value: "id1"
        },
        {
            label: "s2",
            value: "id2"
        },
        {
            label: "s4",
            value: "id4"
        },
        {
            label: "s3",
            value: "id3"
        },
    ]

    const form = useForm<z.infer<typeof agentValidation>>({
        resolver: zodResolver(agentValidation),
        defaultValues: {
            username: deliveryAgentData.username,
            email: deliveryAgentData.email,
            password: deliveryAgentData.password,
            phoneNumber: deliveryAgentData.phoneNumber,
            sellers: deliveryAgentData.sellers
        }
    });

    const updateDeliveryAgent = async (newData: z.infer<typeof agentValidation>) => {
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URI}/delivery/update-agent/${deliveryAgentData._id}`, newData, {
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
                description: "Unable to updated delivery agent's data",
                action: (
                    <ToastAction altText='Close'>Close</ToastAction>
                )
            })
        }
    }

    return (
        <Form {...form}>
            <form className='flex flex-col gap-3' onSubmit={form.handleSubmit(updateDeliveryAgent)}>
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }: { field: any }) => (
                        <FormItem>
                            <label className='text-[12px]' htmlFor="username">Username</label>
                            <FormControl>
                                <article className="relative group">
                                    <CircleUserRound strokeWidth={1} className="text-gray-500 absolute top-[6px] left-2 group-focus-within:text-black transition-colors" />
                                    <Input className="pl-10 focus:ring-1 focus:ring-black" name="username" type="text" placeholder="Delivery Agent Username" {...field} />
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
                                        <Input className="pl-10 focus:ring-1 focus:ring-black" type={viewPassword ? 'text' : 'password'} placeholder='Delivery Agent Account Password' {...field} />
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
                                        <Input className="pl-10 focus:ring-1 focus:ring-black" name='email' type='email' placeholder='Delivery Agent Email Address' {...field} />
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
                                        <Input className="pl-10 focus:ring-1 focus:ring-black" name='phoneNumber' type='text' placeholder='Delivery Agent Phone Number' {...field} />
                                    </article>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </aside>
                <FormField
                    control={form.control}
                    name='sellers'
                    render={({ field }) => (
                        <FormItem>
                            <label className="text-[12px]" htmlFor="sellers">Assign Sellers</label>
                            <FormControl>
                                <Select
                                    isMulti
                                    options={sellerOptions}
                                    value={sellerOptions.filter(option => field.value.includes(option.value))}
                                    onChange={(selected) => {
                                        form.setValue("sellers", selected.map(item => item.value));
                                    }}
                                    styles={{
                                        control: (base, state) => ({
                                            ...base,
                                            display: "flex",
                                            height: "2.25rem",
                                            width: "100%",
                                            borderRadius: "0.375rem",
                                            border: "1px solid #e5e7eb",
                                            backgroundColor: "transparent",
                                            paddingLeft: "0.75rem",
                                            fontSize: "1rem",
                                            boxShadow: state.isFocused ? "0 0 0 1px black" : "none",
                                            transition: "all 0.2s ease",
                                            placeholderColor: "#6b7280",
                                        }),
                                        placeholder: (base) => ({
                                            ...base,
                                            color: "#6b7280",
                                        }),
                                        multiValue: (base) => ({
                                            ...base,
                                            backgroundColor: "#000",
                                            borderRadius: "4px",
                                            color: "white",
                                        }),
                                        multiValueLabel: (base) => ({
                                            ...base,
                                            color: "white",
                                        }),
                                        multiValueRemove: (base) => ({
                                            ...base,
                                            color: "white",
                                            ":hover": {
                                                backgroundColor: "#000",
                                                color: "white",
                                            },
                                        }),
                                        menu: (base) => ({
                                            ...base,
                                            backgroundColor: "white",
                                            borderRadius: "6px",
                                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                        }),
                                        option: (base, state) => ({
                                            ...base,
                                            backgroundColor: state.isSelected ? "#000" : "white",
                                            color: state.isSelected ? "white" : "black",
                                            padding: "10px",
                                            cursor: "pointer",
                                            ":hover": {
                                                backgroundColor: "#000",
                                                color: "white",
                                            },
                                        }),
                                    }}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type='submit'>
                    Update Delivery Agent Data
                </Button>
            </form>
        </Form>
    )
}

export default UpdateDeliveryAgentForm;