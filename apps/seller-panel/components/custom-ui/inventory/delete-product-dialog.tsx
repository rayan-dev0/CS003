import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import axios from 'axios';


const DeleteProductDialog: React.FC<{ productId: string }> = ({ productId }) => {

    const session = useSession();

    const deleteProduct = async (productId: string) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URI}/inventory/product/delete/${productId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "sellerId": `${session?.data?.user?.id}`
                }
            });
            toast("Product removed successfully");
        } catch (error) {
            console.error("Error deleting data", error);
            toast("Failed to remove product");
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className='text-red-600' size={'icon'} variant={'ghost'}>
                    <Trash2 />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the product from the servers.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>
                    Cancel
                </AlertDialogCancel>
                <AlertDialogAction className="bg-red-600" onClick={() => deleteProduct(productId)}>
                    Delete
                </AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteProductDialog