"use client";

import React, { useRef } from 'react';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { FilePenLine, UserRoundPlus } from 'lucide-react';
import UpdateSellerForm from './update-seller-form';
import { SellerType } from '@/lib/types';


const UpdateSellerDialog: React.FC<{ sellerData: SellerType }> = ({ sellerData }) => {

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
                        Update Data of {sellerData.username}
                    </DialogTitle>
                </DialogHeader>
                <hr />
                <UpdateSellerForm closeRef={closeRef} sellerData={sellerData} />
                <DialogClose ref={closeRef}></DialogClose>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateSellerDialog;
