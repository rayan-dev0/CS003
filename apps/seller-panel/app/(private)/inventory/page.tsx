import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Inventory = () => {
  return (
    <main className='w-full'>
        <section className='flex justify-end py-4 px-5'>
            <Link href='/inventory/new-product'>
                <Button>
                    <PlusCircle />
                    New Product
                </Button>
            </Link>
        </section>
    </main>
  )
}

export default Inventory;