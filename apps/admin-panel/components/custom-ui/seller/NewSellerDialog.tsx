"use client";

import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '../../ui/form';

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios';
import { headers } from 'next/headers';
import { auth } from '@/auth';
import { json } from 'stream/consumers';
import { useSession } from 'next-auth/react';
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRef } from 'react';
const formValidation = z.object({
    username: z.string().min(2, "Seller's Username is required"),
    email: z.string().email().min(8, "Email is required"),
    password: z.string().min(8, "Password is required").max(16),
    businessName: z.string().min(8, "Business Name is required").max(20),
    businessType: z.enum(["Retail", "Wholesale", "Manufacturer", "Service", "Product", "Consultancy"]),
    businessAddress: z.string().min(8, "Business Address is required").max(30),
    phoneNumber: z.string().min(10, "Phone Number is required").max(10),
})

type FormData = z.infer<typeof formValidation>;

const NewSellerDialog: React.FC = () => {
    const form = useForm<FormData>({
        resolver: zodResolver(formValidation),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            businessName: "",
            businessType: "Retail",
            businessAddress: "",
            phoneNumber: "",
        }
    })
    const session = useSession()
    const { toast } = useToast()
    const closeRef = useRef<HTMLButtonElement | null>(null)

    const onSubmit = async (data: FormData) => {
        try {

            await axios.post("http://localhost:3000/api/seller", data, {
                headers: {
                    "Content-Type": "application/json",
                    "adminKey": `Bearer-${session.data?.user?.id}`
                }
            })
            toast({
                title: "Form Has Been Submitted Sucessfully ",
                variant: "default",
            })
            closeRef.current?.click()
        } catch (error) {
            console.log(error);
            toast({
                title: "error Submitting Form",
                variant: "destructive",
                description: "Please Try again and fill the fields correctly ",
            })

        }
    }

    const SellerFormData = [
        {
            id: "username",
            type: "username",
            FormFieldName: "username",
            lable: "Seller Username",
            placeholder: "Username"
        },
        {
            id: "email",
            type: "email",
            FormFieldName: "email",
            lable: "Email",
            placeholder: "Email"
        },
        {
            id: "password",
            type: "password",
            FormFieldName: "password",
            lable: "Password",
            placeholder: "Password"
        },
        {
            id: "businessName",
            type: "text",
            FormFieldName: "businessName",
            lable: "Business Name",
            placeholder: "Business Name"
        },
        {
            id: "businessAddress",
            type: "text",
            FormFieldName: "businessAddress",
            lable: "Business Address",
            placeholder: "Business Address"
        },
        {
            id: "phoneNumber",
            type: "phone",
            FormFieldName: "phoneNumber",
            lable: "Phone Number",
            placeholder: "Phone Number"
        },
    ]

    const businessType = ["Retail", "Wholesale", "Manufacturer", "Service", "Product", "Consultancy"]

    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button>Add New Seller</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a New Seller</DialogTitle>
                    <DialogDescription>
                        Please Enter The Details to Add a New Seller
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="">
                            <div className="py-2">
                                {SellerFormData.map((data) => (
                                    <div className='py-2' key={data.id}>
                                        <FormField
                                            control={form.control}
                                            name={data.FormFieldName as keyof FormData}
                                            render={({ field }: { field: any }) => (
                                                <FormItem>
                                                    <label htmlFor="">{data.lable}</label>
                                                    <FormControl>
                                                        <Input className='mt-2 w-[20rem]' type={data.type} placeholder={data.placeholder} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                ))}
                                <span className='py-2'>
                                    <label htmlFor="" >Business Type</label>
                                </span>
                                <div className='py-2'>
                                    <FormField
                                        control={form.control}
                                        name='businessType'
                                        render={({ field }: { field: any }) => (
                                            <Select>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Select a Business Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Business Type</SelectLabel>
                                                        {businessType.map((items, i) => (
                                                            <SelectItem key={i} value={items}>{items}</SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        )} />
                                </div>
                            </div>

                        </div>
                        <DialogClose ref={closeRef}>
                        </DialogClose>
                        <Button type='submit' className='mt-8 w-full text-md font-semibold '>
                            Add New Seller
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default NewSellerDialog