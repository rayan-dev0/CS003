import InventoryNav from '@/components/custom-ui/inventory/inventory-nav';
import { auth } from '@/auth';
import axios from 'axios';
import ProductsTable from '@/components/custom-ui/inventory/products-table';
import { columns } from '@/components/custom-ui/inventory/columns';

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
    return [];
  }
};

export default async function InventoryPage() {

  const session = await auth();
  const sellerId = session?.user?.id;
  let products = [];

  if(sellerId) products = await fetchProducts(sellerId);

  return (
    <main className="w-full">
      <section className="flex justify-between items-center py-4 px-5">
        <InventoryNav />
      </section>
      <section className="w-full px-4 space-y-4">
        {products.length > 0 ? (
          <ProductsTable data={products} columns={columns} />
        ) : (
          <p className="text-gray-500">No products found.</p>
        )}
      </section>
    </main>
  );
}
