"use client";

import React, { useRef } from 'react';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { UserRoundPlus } from 'lucide-react';
import AddDeliveryBoyForm from './add-boy-form';

const AddDeliveryBoyDialog: React.FC = () => {

    const closeRef = useRef<HTMLButtonElement>(null);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <UserRoundPlus />
                    Create Delivery Boy
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create Delivery Boy Account
                    </DialogTitle>
                </DialogHeader>
                <hr />
                <AddDeliveryBoyForm closeRef={closeRef} />
                <DialogClose ref={closeRef}></DialogClose>
            </DialogContent>
        </Dialog>
    )
}

export default AddDeliveryBoyDialog;
