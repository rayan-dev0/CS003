"use client";

import React, { useRef } from 'react';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { FilePenLine } from 'lucide-react';
import { DeliveryBoyType } from '@/lib/types';
import UpdateDeliveryBoyForm from './update-boy-form';


const UpdateDeliveryBoyDialog: React.FC<{ deliveryBoyData: DeliveryBoyType }> = ({ deliveryBoyData }) => {

    const closeRef = useRef<HTMLButtonElement>(null);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={'icon'} variant={'ghost'}>
                    <FilePenLine />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Update Data of {deliveryBoyData.username}
                    </DialogTitle>
                </DialogHeader>
                <hr />
                <UpdateDeliveryBoyForm closeRef={closeRef} deliveryBoyData={deliveryBoyData} />
                <DialogClose ref={closeRef}></DialogClose>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateDeliveryBoyDialog;
