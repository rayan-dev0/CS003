import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { Trash2 } from "lucide-react";
  
const DeleteDialog: React.FC<{ deliveryAgentId: string }> = ({ deliveryAgentId }) => {
  
    const deleteDeliveryAgent = async (deliveryAgentId: string) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URI}/delivery/delete-agent/${deliveryAgentId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "adminKey": `Bearer-${process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY}`
                }
            });
            toast({
                title: "Success",
                description: "Delivery agent removed successfully",
            });
        } catch (error) {
            console.error("Error deleting data", error);
            toast({
                title: "Action Failed",
                description: "Failed to remove the delivery agent data",
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
              This action cannot be undone. This will permanently delete delivery agent
              account from the servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
                Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="bg-red-600" onClick={() => deleteDeliveryAgent(deliveryAgentId)}>
                Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
}
  
export default DeleteDialog;