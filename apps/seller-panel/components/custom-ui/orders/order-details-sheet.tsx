import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import { OrderTableColumns } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface OrderDetailsSheetProps {
  order: OrderTableColumns;
}

export function OrderDetailsSheet({ order }: OrderDetailsSheetProps) {

    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
            <ArrowUpDown className="h-4 w-4" />
            </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[500px] sm:w-[540px] bg-white">
            <SheetHeader>
            <SheetTitle>Order Details</SheetTitle>
            </SheetHeader>
            {/* Status Badge - prominent and colored */}
            <div className="w-full flex justify-center my-4">
                {(() => {
                    let bg = 'bg-gray-200';
                    let text = 'text-gray-800';
                    switch (order.status) {
                        case 'pending':
                            bg = 'bg-yellow-400'; text = 'text-yellow-900';
                            break;
                        case 'confirmed':
                            bg = 'bg-blue-500'; text = 'text-white';
                            break;
                        case 'preparing':
                            bg = 'bg-orange-400'; text = 'text-white';
                            break;
                        case 'ready_for_pickup':
                            bg = 'bg-indigo-500'; text = 'text-white';
                            break;
                        case 'out_for_delivery':
                            bg = 'bg-purple-500'; text = 'text-white';
                            break;
                        case 'delivered':
                            bg = 'bg-green-500'; text = 'text-white';
                            break;
                        case 'cancelled':
                            bg = 'bg-red-500'; text = 'text-white';
                            break;
                        default:
                            bg = 'bg-gray-200'; text = 'text-gray-800';
                    }
                    return (
                        <div
                            className={`w-full text-center py-4 rounded-xl font-bold uppercase tracking-wide shadow-lg text-xl ${bg} ${text}`}
                            style={{ letterSpacing: '0.1em' }}
                        >
                            {String(order.status).replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </div>
                    );
                })()}
            </div>
            <div className="mt-4 p-4 bg-white rounded-lg shadow space-y-6">
            <div className="flex flex-col gap-1 border-b pb-4">
                <span className="text-xs text-gray-500">Order ID: <span className="font-mono">{order._id}</span></span>
                <span className="text-xs text-gray-500">Customer Name: <span className="font-mono">{order.customerName}</span></span>
                <span className="text-xs text-gray-500">Phone Number: <span className="font-mono">{order.phoneNumber}</span></span>
                <span className="text-xs text-gray-500">Date: {new Date(order.timestamp).toLocaleString()}</span>
                <span className="text-xs text-gray-500">Delivery Address: {order.deliveryAddress}</span>
            </div>

            <div>
                <h3 className="font-semibold mb-2 text-sm">Items</h3>
                <div className="overflow-x-auto">
                <table className="min-w-full text-xs border rounded">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="px-2 py-1 text-left">Name</th>
                        <th className="px-2 py-1 text-right">Qty</th>
                        <th className="px-2 py-1 text-right">Price</th>
                        <th className="px-2 py-1 text-right">Subtotal</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(order.items) && order.items.map((item: any, idx: number) => (
                        <tr key={item.productId || idx} className="border-b last:border-b-0">
                        <td className="px-2 py-1">{item.name || item.productId}</td>
                        <td className="px-2 py-1 text-right">{item.quantity}</td>
                        <td className="px-2 py-1 text-right">₹{item.price}</td>
                        <td className="px-2 py-1 text-right">₹{item.price * item.quantity}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>

            <div className="flex flex-col gap-1 border-t pt-4">
                <div className="flex justify-between text-sm">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">₹{order.totalAmount}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                <span>Payment Method</span>
                <span className="capitalize">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                <span>Payment Status</span>
                <span className="capitalize">{order.paymentStatus}</span>
                </div>
            </div>
            </div>
        </SheetContent>
        </Sheet>
    );
} 