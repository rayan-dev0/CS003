"use client";

import { newProductFormValidation } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { ChartColumn, CheckIcon, ImagesIcon, IndianRupee, Layers, PlusCircle, ShoppingBag, SquarePen, Trash, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { InventoryContext } from '@/providers/inventory-provider';

const NewProduct = () => {
    
    const session = useSession();

    const { categories } = useContext(InventoryContext);

    const form = useForm({
        resolver: zodResolver(newProductFormValidation),
        defaultValues: {
            name: "",
            description: "",
            price: "",
            stock_quantity: 0,
            admin_category: "67fcaf5cfe6312053117b084",
            category: "",
            images: [] as string[],
            status: "Out of Stock"
        }
    });
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [description, setDescription] = useState("");
    const router = useRouter();

    const inputRef = useRef<HTMLInputElement>(null);

    const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            if (selectedImages.length + files.length > 5) {
                toast.error("You can only upload a maximum of 5 images.");
                return;
            }
    
            const selectedImageURLs: string[] = [];
            const newFiles: File[] = [];
    
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileURL = URL.createObjectURL(file);
                selectedImageURLs.push(fileURL);
                newFiles.push(file);
            }
    
            setSelectedImages(prev => [...prev, ...selectedImageURLs]);
            setImageFiles(prev => [...prev, ...newFiles]);
        }
    };

    const handleImageUpload = async (files: File[]) => {
        const formData = new FormData();
        files.forEach(file => {
            formData.append('images', file); 
        });
    
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/inventory/product/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "sellerId": `${session.data?.user?.id}`,
                    }
                }
            );

            return response.data.urls;
        } catch (error) {
            toast.error("Image upload failed.");
            console.error("Azure upload error:", error);
            return [];
        }
    };
    
    const addNewProduct = async (data: any) => {
        const price = parseFloat(data.price);
        const stock_quantity = parseInt(data.stock_quantity, 10);
    
        let uploadedImageURLs: string[] = [];
        if (imageFiles.length > 0) {
            uploadedImageURLs = await handleImageUpload(imageFiles);
        }
    
        const productData = {
            ...data,
            price,
            stock_quantity,
            description,
            images: uploadedImageURLs
        };

        console.log("Product Data:", productData);
    
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/inventory/product/create`, productData, {
                    headers: {
                        "Content-Type": "application/json",
                        "sellerId": `${session.data?.user?.id}`
                    }
                }
            );
            toast.success("New product added successfully");
            form.reset();
            setDescription("");
            setSelectedImages([]);
            setImageFiles([]);
        } catch (error) {
            toast.error("Failed to add product.");
            console.error('Error adding product:', error);
        }
    };    

    return (
        <main className='w-full px-5 py-4'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(addNewProduct)}>
                    <section className='flex justify-between items-center'>
                        <h2 className='font-medium text-2xl md:py-4'>
                            Add New Product
                        </h2>
                        <aside className='flex items-center gap-2'>
                            <Button className='text-white bg-red-500 hover:bg-red-600' type='button' onClick={() => { form.reset(); setDescription(""); router.push('/inventory'); }}>
                                <X />
                                Cancel
                            </Button>
                            <Button type='submit'>
                                <CheckIcon />
                                Add Product
                            </Button>
                        </aside>
                    </section>
                    <div className='flex md:flex-row flex-col gap-2'>
                        <section className='md:w-1/2 md:border-r flex flex-col gap-6 md:pr-7 mt-4'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <label className='text-[13px]' htmlFor="name">Product Name</label>
                                        <FormControl>
                                            <article className="relative group">
                                                <SquarePen strokeWidth={1} className="text-gray-500 absolute top-[6px] left-2 group-focus-within:text-black transition-colors" />
                                                <Input className="pl-10 focus:ring-1 focus:ring-black" name="name" type="text" placeholder="Enter Product Name" {...field} />
                                            </article>
                                        </FormControl>
                                        <FormMessage className='text-red-500 text-sm' />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='admin_category'
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <label className='text-[13px]' htmlFor="admin_category">Product Type</label>
                                        <FormControl>
                                            <article className="relative group">
                                                <ShoppingBag strokeWidth={1} className="text-gray-500 absolute top-[6px] left-2 group-focus-within:text-black transition-colors" />
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className="pl-10 focus:ring-1 focus:ring-black">
                                                        <SelectValue placeholder="Select Product Type" />
                                                    </SelectTrigger>
                                                    <SelectContent className='bg-white'>
                                                        <SelectItem value="67fcaf5cfe6312053117b084">Food</SelectItem>
                                                        <SelectItem value="67fa466d8cb088fb4e99f9f2">General</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </article>
                                        </FormControl>
                                        <FormMessage className='text-red-500 text-sm' />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='category'
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <label className='text-[13px]' htmlFor="category">Product Category</label>
                                        <FormControl>
                                            <div className='flex gap-2 items-center'>
                                                <article className="relative group w-full">
                                                    <ShoppingBag strokeWidth={1} className="text-gray-500 absolute top-[6px] left-2 group-focus-within:text-black transition-colors" />
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger className="pl-10 focus:ring-1 focus:ring-black">
                                                            <SelectValue placeholder="Select Product Category" />
                                                        </SelectTrigger>
                                                        <SelectContent className='bg-white'>
                                                            {
                                                                categories?.map(category => (
                                                                    <SelectItem key={category._id} value={category._id}>{category?.name}</SelectItem>
                                                                ))
                                                            }
                                                        </SelectContent>
                                                    </Select>
                                                </article>
                                                <NewCategoryModal />
                                            </div>
                                        </FormControl>
                                        <FormMessage className='text-red-500 text-sm' />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='price'
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <label className='text-[13px]' htmlFor="price">Product Pricing</label>
                                        <FormControl>
                                            <article className="relative group">
                                                <IndianRupee strokeWidth={1} className="text-gray-500 absolute top-[6px] left-2 group-focus-within:text-black transition-colors" />
                                                <Input
                                                    className="pl-10 focus:ring-1 focus:ring-black"
                                                    name="price"
                                                    type="text"  
                                                    placeholder="Enter Product Price"
                                                    {...field}
                                                />
                                            </article>
                                        </FormControl>
                                        <FormMessage className='text-red-500 text-sm' />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='stock_quantity'
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <label className='text-[13px]' htmlFor="stock_quantity">Stock Quantity</label>
                                        <FormControl>
                                            <article className="relative group">
                                                <Layers strokeWidth={1} className="text-gray-500 absolute top-[6px] left-2 group-focus-within:text-black transition-colors" />
                                                <Input
                                                    className="pl-10 focus:ring-1 focus:ring-black"
                                                    name="stock_quantity"
                                                    type="text"  
                                                    placeholder="Enter Stock Quantity"
                                                    {...field}
                                                />
                                            </article>
                                        </FormControl>
                                        <FormMessage className='text-red-500 text-sm' />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='status'
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <label className='text-[13px]' htmlFor="status">Stock Status</label>
                                        <FormControl>
                                            <article className="relative group">
                                                <ChartColumn strokeWidth={1} className="text-gray-500 absolute top-[6px] left-2 group-focus-within:text-black transition-colors" />
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className="pl-10 focus:ring-1 focus:ring-black">
                                                        <SelectValue placeholder="Select Stock Status" />
                                                    </SelectTrigger>
                                                    <SelectContent className='bg-white'>
                                                        <SelectItem value="In Stock">In Stock</SelectItem>
                                                        <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </article>
                                        </FormControl>
                                        <FormMessage className='text-red-500 text-sm' />
                                    </FormItem>
                                )}
                            />
                        </section>
                        <section className='md:w-1/2 flex flex-col gap-6 md:pl-4 mt-4'>
                            <FormField
                                control={form.control}
                                name='images'
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <label className='text-[13px]' htmlFor="images">Product Images</label>
                                        <div>
                                            <article onClick={() => { inputRef.current?.click() }} className='w-full h-[150px] border-dashed border rounded-lg flex items-center justify-center flex-col gap-3 cursor-pointer'>
                                                <ImagesIcon className="text-[#D3D3D3] h-14 w-14" />
                                                <p className="text-center text-gray-500">Click to upload</p>
                                            </article>
                                            <Input
                                                type="file"
                                                ref={inputRef}
                                                multiple
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageSelection}
                                            />
                                            {selectedImages.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mt-4">
                                                    {selectedImages.map((url, index) => (
                                                        <div key={index} className="relative group">
                                                            <img
                                                                src={url}
                                                                alt={`uploaded-image-${index}`}
                                                                className="w-[125px] h-[125px] object-cover rounded-md border"
                                                            />
                                                            <button
                                                                onClick={() => {
                                                                    const newImageURLs = selectedImages.filter((_, i) => i !== index);
                                                                    setSelectedImages(newImageURLs);
                                                                    form.setValue('images', newImageURLs);
                                                                }}
                                                                className="absolute bg-red-500 p-1 rounded-full text-[10px] bottom-1 right-1 text-white hidden group-hover:block"
                                                            >
                                                                <Trash size={14} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <FormMessage className='text-red-500 text-sm' />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='description'
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <label className='text-[13px]' htmlFor="description">Product Description</label>
                                        <FormControl>
                                            <ReactQuill className='rounded-md' theme="snow" value={description} onChange={setDescription} />
                                        </FormControl>
                                        <FormMessage className='text-red-500 text-sm' />
                                    </FormItem>
                                )}
                            />
                        </section>
                    </div>
                </form>
            </Form>
        </main>
    );
};

const NewCategoryModal = () => {

    const session = useSession();

    const { fetchCategories } = useContext(InventoryContext);

    const [categoryName, setCategoryName] = useState<string>("");
    const closeRef = useRef<HTMLButtonElement>(null);

    const addNewCategory = async () => {
        if (!categoryName) {
            toast.error("Category name is required");
            return;
        }

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/inventory/category/create`, {
                name: categoryName,
                seller: `${session.data?.user?.id}`,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "sellerId": `${session.data?.user?.id}`,
                }
            });
            toast.success("New category created successfully");
            setCategoryName("");
            closeRef?.current?.click();
            fetchCategories();
        } catch (error) {
            toast.error("Failed to create new category");
            console.error('Error creating new category:', error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='w-[30%] text-[10px] md:text-[12px]'>
                    <PlusCircle />
                    New Category
                </Button>
            </DialogTrigger>
            <DialogContent className='bg-white w-[94%] md:w-full rounded-lg'>
                <DialogHeader>
                    <DialogTitle>Add New Product Category</DialogTitle>
                </DialogHeader>
                <hr />
                <div className='flex gap-2 items-center'>
                    <article className="relative group w-[75%]">
                        <Layers strokeWidth={1} className="text-gray-500 absolute top-[6px] left-2 group-focus-within:text-black transition-colors" />
                        <Input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="pl-10 focus:ring-1 focus:ring-black" name="category" type="text" placeholder="Enter New Category Name" required />
                    </article>
                    <Button onClick={addNewCategory} className='w-[25%] text-[12px] md:text-md'>
                        <CheckIcon />
                        Create
                    </Button>
                </div>
                <DialogClose ref={closeRef}></DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default NewProduct;