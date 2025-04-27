import InventoryNav from '@/components/custom-ui/inventory/inventory-nav';
import { auth } from '@/auth';
import axios from 'axios';
import ProductsTable from '@/components/custom-ui/inventory/products-table';
import { columns } from '@/components/custom-ui/inventory/columns';
import { Suspense } from 'react';

const fetchProducts = async (sellerId: string) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/inventory/product/get`, {
      headers: {
        "Content-Type": "application/json",
        "sellerId": sellerId
      }
    });
    const data = response.data.products;
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

function LoadingState() {
  return (
    <div className="w-full h-96 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );
}

export default async function InventoryPage() {
  const session = await auth();
  const sellerId = session?.user?.id;

  if (!sellerId) {
    return (
      <main className="w-full">
        <section className="flex justify-between items-center py-4 px-5">
          <InventoryNav />
        </section>
        <section className="w-full px-4 space-y-4">
          <p className="text-red-500">Please login to view your inventory.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="w-full">
      <section className="flex justify-between items-center py-4 px-5">
        <InventoryNav />
      </section>
      <section className="w-full px-4 space-y-4">
        <Suspense fallback={<LoadingState />}>
          <ProductsTableWrapper sellerId={sellerId} />
        </Suspense>
      </section>
    </main>
  );
}

async function ProductsTableWrapper({ sellerId }: { sellerId: string }) {
  try {
    const products = await fetchProducts(sellerId);
    
    if (products.length === 0) {
      return <p className="text-gray-500">No products found.</p>;
    }

    return <ProductsTable data={products} columns={columns} />;
  } catch (error) {
    return <p className="text-red-500">Error loading products. Please try again later.</p>;
  }
}
