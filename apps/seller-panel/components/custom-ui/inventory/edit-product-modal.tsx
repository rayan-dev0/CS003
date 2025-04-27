'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { EditProductModalProps } from '@/lib/types';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { PencilLine, Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { newProductFormValidation } from '@/lib/zod';
import React, { useState, useRef, useContext } from 'react';
import { InventoryContext } from '@/providers/inventory-provider';
import { toast } from 'sonner';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const EditProductModal: React.FC<EditProductModalProps> = ({ productData }) => {
    const { categories } = useContext(InventoryContext);
    const session = useSession();
    const closeRef = useRef<HTMLButtonElement>(null);

    console.log(productData)

    const form = useForm({
        resolver: zodResolver(newProductFormValidation),
        defaultValues: {
            name: productData.name || '',
            description: productData.description || '',
            price: productData.price?.toString() || '',
            stock_quantity: productData.stock_quantity || 0,
            admin_category: productData.admin_category || '',
            category: productData.category || '',
            images: productData.images || [],
            status: productData.status || 'Out of Stock'
        }
    });

    const [selectedImages, setSelectedImages] = useState<string[]>(productData.images || []);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [description, setDescription] = useState<string>(productData.description || '');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            if (selectedImages.length + files.length > 5) {
                toast.error("You can only upload a maximum of 5 images.");
                return;
            }

            const newImageURLs: string[] = [];
            const newFiles: File[] = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileURL = URL.createObjectURL(file);
                newImageURLs.push(fileURL);
                newFiles.push(file);
            }

            setSelectedImages(prev => [...prev, ...newImageURLs]);
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
                    'sellerId': `${session.data?.user?.id}`,
                }
            });

            return response.data.urls;
        } catch (error) {
            toast.error("Image upload failed.");
            console.error("Image upload error:", error);
            return [];
        }
    };

    const updateProduct = async (data: any) => {
        const price = parseFloat(data.price);
        const stock_quantity = parseInt(data.stock_quantity, 10);

        let uploadedImageURLs: string[] = productData.images || [];

        if (imageFiles.length > 0) {
            const newlyUploaded = await handleImageUpload(imageFiles);
            uploadedImageURLs = [...uploadedImageURLs, ...newlyUploaded];
        }

        const updatedProduct = {
            ...data,
            price,
            stock_quantity,
            description,
            images: uploadedImageURLs,
        };

        try {
            await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URI}/inventory/product/update/${productData._id}`, updatedProduct, {
                headers: {
                    'Content-Type': 'application/json',
                    'sellerId': `${session.data?.user?.id}`,
                }
            });
            toast.success("Product updated successfully!");
            closeRef.current?.click();
        } catch (error) {
            toast.error("Failed to update product.");
            console.error('Error updating product:', error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon" variant="ghost">
                    <PencilLine />
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white rounded-lg max-h-[90vh] overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(updateProduct)} className="flex flex-col gap-5 mt-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <label>Product Name</label>
                                    <FormControl>
                                        <Input placeholder="Product Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="admin_category"
                            render={({ field }) => (
                                <FormItem>
                                    <label>Product Type</label>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="67fcaf5cfe6312053117b084">Food</SelectItem>
                                                <SelectItem value="67fa466d8cb088fb4e99f9f2">General</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <label>Product Category</label>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories?.map(category => (
                                                    <SelectItem key={category._id} value={category._id}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <label>Price</label>
                                    <FormControl>
                                        <Input placeholder="Price" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="stock_quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <label>Stock Quantity</label>
                                    <FormControl>
                                        <Input placeholder="Stock Quantity" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <label>Stock Status</label>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="In Stock">In Stock</SelectItem>
                                                <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col gap-3">
                            <label>Product Images</label>
                            <article onClick={() => inputRef.current?.click()} className="w-full h-[150px] border-dashed border rounded-lg flex items-center justify-center flex-col gap-3 cursor-pointer">
                                <p className="text-gray-500">Click to upload</p>
                            </article>
                            <Input type="file" multiple accept="image/*" ref={inputRef} className="hidden" onChange={handleImageSelection} />
                            <div className="flex flex-wrap gap-2">
                                {selectedImages.map((url, index) => (
                                    <div key={index} className="relative group">
                                        <img src={url} alt={`uploaded-${index}`} className="w-[100px] h-[100px] object-cover rounded-md" />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const updatedImages = selectedImages.filter((_, idx) => idx !== index);
                                                setSelectedImages(updatedImages);
                                                form.setValue('images', updatedImages);
                                            }}
                                            className="absolute bg-red-500 text-white p-1 rounded-full bottom-1 right-1 hidden group-hover:block"
                                        >
                                            <Trash size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label>Product Description</label>
                            <ReactQuill value={description} onChange={setDescription} className="rounded-md" theme="snow" />
                        </div>

                        <div className="flex justify-end gap-2 mt-5">
                            <DialogClose asChild>
                                <Button variant="outline" ref={closeRef}>Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Update</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditProductModal;
