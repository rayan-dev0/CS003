import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { Trash2 } from "lucide-react";
  
const DeleteDialog: React.FC<{ sellerId: string }> = ({ sellerId }) => {

    const deleteSeller = async (sellerId: string) => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URI}/seller/delete-seller/${sellerId}`, {
                headers: {
                  "Content-Type": "application/json",
                  "adminKey": `Bearer-${process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY}`
                }
            });
            console.log(response)
            toast({
                title: "Success",
                description: "Seller removed successfully",
            });
        } catch (error) {
            console.error("Error deleting seller", error);
            toast({
                title: "Action Failed",
                description: "Failed to remove the seller data",
                variant: "destructive"
            });
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
              This action cannot be undone. This will permanently delete seller
              account from the servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
                Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="bg-red-600" onClick={() => deleteSeller(sellerId)}>
                Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
}
  
export default DeleteDialog;