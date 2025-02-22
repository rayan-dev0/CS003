"use client";

import React, { useRef } from 'react';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { FilePenLine } from 'lucide-react';
import { DeliveryAgentType } from '@/lib/types';
import UpdateDeliveryAgentForm from './update-agent-form';


const UpdateDeliveryAgentDialog: React.FC<{ deliveryAgentData: DeliveryAgentType }> = ({ deliveryAgentData }) => {

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
                        Update Data of {deliveryAgentData.username}
                    </DialogTitle>
                </DialogHeader>
                <hr />
                <UpdateDeliveryAgentForm closeRef={closeRef} deliveryAgentData={deliveryAgentData} />
                <DialogClose ref={closeRef}></DialogClose>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateDeliveryAgentDialog;
