import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const InventoryNav = () => {
  return (
    <>
        <h2 className='font-medium text-2xl md:py-4'>
          Inventory
        </h2>
        <Link href='/inventory/new-product'>
          <Button>
            <PlusCircle />
            New Product
          </Button>
        </Link>
    </>
  )
}

export default InventoryNav;