"use client";

import React from 'react'
import {
    Dialog,
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

const formValidation = z.object({
    SellerUsername: z.string().min(2, "Seller's Username is required"),
    Email: z.string().email().min(8, "Email is required"),
    Password: z.string().min(8, "Password is required").max(16),
    BusinessName: z.string().min(8, "Business Name is required").max(20),
    BusinessType: z.string().min(8, "Business Type is required").max(20),
    BusinessAddress: z.string().min(8, "Business Address is required").max(30),
    PhoneNumber: z.string().min(10, "Phone Number is required").max(10),
})

type FormData = z.infer<typeof formValidation>;

const NewSellerDialog: React.FC = () => {
    const form = useForm<FormData>({
        resolver: zodResolver(formValidation),
        defaultValues: {
            SellerUsername: "",
            Email: "",
            Password: "",
            BusinessName: "",
            BusinessType: "",
            BusinessAddress: "",
            PhoneNumber: "",
        }
    })

    const onSubmit = (data: FormData) => {
        console.log(data);
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
            type: "businessName",
            FormFieldName: "businessName",
            lable: "Business Name",
            placeholder: "Business Name"
        },
        {
            id: "businessAddress",
            type: "businessAddress",
            FormFieldName: "businessAddress",
            lable: "Business Address",
            placeholder: "Business Address"
        },
        {
            id: "businessType",
            type: "businessType",
            FormFieldName: "businessType",
            lable: "Business Type",
            placeholder: "Business Type"
        },
        {
            id: "phoneNumber",
            type: "phoneNumber",
            FormFieldName: "phoneNumber",
            lable: "Phone Number",
            placeholder: "Phone Number"
        },
    ]



    return (
        <Dialog>
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
                                            name={data.FormFieldName }
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
                            </div>

                        </div>
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