"use client";

import React, { useRef } from 'react';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { UserRoundPlus } from 'lucide-react';
import AddDeliveryAgentForm from './add-agent-form';

const AddDeliveryAgentDialog: React.FC = () => {

    const closeRef = useRef<HTMLButtonElement>(null);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <UserRoundPlus />
                    Create Delivery Agent
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create Delivery Agent Account
                    </DialogTitle>
                </DialogHeader>
                <hr />
                <AddDeliveryAgentForm closeRef={closeRef} />
                <DialogClose ref={closeRef}></DialogClose>
            </DialogContent>
        </Dialog>
    )
}

export default AddDeliveryAgentDialog;
