'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { EditProductModalProps } from '@/lib/types';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChartColumn, CheckIcon, ImagesIcon, IndianRupee, Layers, PencilLine, ShoppingBag, SquarePen, Trash, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { newProductFormValidation } from '@/lib/zod';
import React, { useState, useRef, useContext, useEffect } from 'react';
import { InventoryContext } from '@/providers/inventory-provider';
import { toast } from 'sonner';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { PlusCircle } from 'lucide-react';

const EditProductModal: React.FC<EditProductModalProps> = ({ productData }) => {
    const { categories } = useContext(InventoryContext);
    const session = useSession();
    const closeRef = useRef<HTMLButtonElement>(null);
    const [categoryId, setCategoryId] = useState<string>('');

    // Find the category ID when categories are loaded
    useEffect(() => {
        if (categories && productData.category) {
            const foundCategory = categories.find(cat => cat.name === productData.category);
            if (foundCategory) {
                setCategoryId(foundCategory._id);
            }
        }
    }, [categories, productData.category]);

    const form = useForm({
        resolver: zodResolver(newProductFormValidation),
        defaultValues: {
            name: productData.name || '',
            description: productData.description || '',
            price: productData.price?.toString() || '',
            stock_quantity: productData.stock_quantity?.toString() || '0',
            admin_category: productData.admin_category || '',
            category: categoryId || '',
            images: productData.images || [],
            status: productData.status || 'Out of Stock'
        }
    });

    // Update form when categoryId is found
    useEffect(() => {
        if (categoryId) {
            form.setValue('category', categoryId);
        }
    }, [categoryId, form]);

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

        // Get existing image URLs (those that don't start with 'blob:')
        const existingImages = selectedImages.filter(url => !url.startsWith('blob:'));
        
        // Upload new images if any
        let newImageURLs: string[] = [];
        if (imageFiles.length > 0) {
            newImageURLs = await handleImageUpload(imageFiles);
        }

        // Combine existing and new image URLs
        const updatedImages = [...existingImages, ...newImageURLs];

        const updatedProduct = {
            ...data,
            price,
            stock_quantity,
            description,
            images: updatedImages,
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
            <DialogContent className="max-w-[800px] rounded-lg h-[90vh] overflow-y-auto bg-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">Edit Product</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(updateProduct)} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <label className="flex items-center gap-2 text-sm font-medium">
                                            <ShoppingBag className="h-4 w-4" />
                                            Product Name
                                        </label>
                                        <FormControl>
                                            <Input placeholder="Enter product name" {...field} />
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
                                        <label className="flex items-center gap-2 text-sm font-medium">
                                            <Layers className="h-4 w-4" />
                                            Product Type
                                        </label>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Type" />
                                                </SelectTrigger>
                                                <SelectContent className='bg-white'>
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
                                        <label className="flex items-center gap-2 text-sm font-medium">
                                            <ChartColumn className="h-4 w-4" />
                                            Product Category
                                        </label>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Category" />
                                                </SelectTrigger>
                                                <SelectContent className='bg-white'>
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
                                        <label className="flex items-center gap-2 text-sm font-medium">
                                            <IndianRupee className="h-4 w-4" />
                                            Price
                                        </label>
                                        <FormControl>
                                            <Input placeholder="Enter price" {...field} />
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
                                        <label className="flex items-center gap-2 text-sm font-medium">
                                            <SquarePen className="h-4 w-4" />
                                            Stock Quantity
                                        </label>
                                        <FormControl>
                                            <Input 
                                                type="number" 
                                                placeholder="Enter stock quantity" 
                                                {...field}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    field.onChange(value);
                                                }}
                                            />
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
                                        <label className="flex items-center gap-2 text-sm font-medium">
                                            <CheckIcon className="h-4 w-4" />
                                            Stock Status
                                        </label>
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
                        </div>

                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-sm font-medium">
                                <ImagesIcon className="h-4 w-4" />
                                Product Images
                            </label>
                            <article 
                                onClick={() => inputRef.current?.click()} 
                                className="w-full h-[150px] border-dashed border rounded-lg flex items-center justify-center flex-col gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                                <PlusCircle className="h-8 w-8 text-gray-400" />
                                <p className="text-gray-500">Click to upload images</p>
                                <p className="text-xs text-gray-400">Maximum 5 images allowed</p>
                            </article>
                            <Input 
                                type="file" 
                                multiple 
                                accept="image/*" 
                                ref={inputRef} 
                                className="hidden" 
                                onChange={handleImageSelection} 
                            />
                            <div className="grid grid-cols-5 gap-4">
                                {selectedImages.map((url, index) => (
                                    <div key={index} className="relative group">
                                        <img 
                                            src={url} 
                                            alt={`uploaded-${index}`} 
                                            className="w-full h-[100px] object-cover rounded-md"
                                        />
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

                        <div className="space-y-4">
                            <label className="text-sm font-medium">Product Description</label>
                            <ReactQuill 
                                value={description} 
                                onChange={setDescription} 
                                className="rounded-md min-h-[200px] mb-12" 
                                theme="snow" 
                            />
                        </div>

                        <div className="flex justify-end gap-4 pt-6">
                            <DialogClose asChild>
                                <Button variant="outline" ref={closeRef}>Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Update Product</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditProductModal;
