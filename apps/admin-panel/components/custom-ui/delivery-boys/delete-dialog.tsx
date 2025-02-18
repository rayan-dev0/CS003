import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { Trash2 } from "lucide-react";
  
const DeleteDialog: React.FC<{ deliveryBoyId: string }> = ({ deliveryBoyId }) => {
    const deleteDeliveryBoy = async (deliveryBoyId: string) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URI}api/delivery?deliveryBoyId=${deliveryBoyId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "adminKey": `Bearer-O2fanmhj4m/IG5cxJHkCJpqx4mI59r5jXRqJJHOIfiE=`
                }
            });
            toast({
                title: "Success",
                description: "Delivery boy removed successfully",
            });
        } catch (error) {
            console.error("Error deleting data", error);
            toast({
                title: "Action Failed",
                description: "Failed to remove the delivery boy data",
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
              This action cannot be undone. This will permanently delete delivery boy
              account from the servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
                Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="bg-red-600" onClick={() => deleteDeliveryBoy(deliveryBoyId)}>
                Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
}
  
export default DeleteDialog;