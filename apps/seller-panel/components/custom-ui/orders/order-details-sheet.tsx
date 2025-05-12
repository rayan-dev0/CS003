import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowRightCircle, ArrowUpDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { OrderTableColumns } from '@/lib/types';
import axios from 'axios';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface OrderDetailsSheetProps {
  order: OrderTableColumns;
}

export function OrderDetailsSheet({ order }: OrderDetailsSheetProps) {

    const session = useSession();
    const userId = session?.data?.user?.id;
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(order.status);
    const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus);
    const [agentId, setAgentId] = useState<string | undefined>(order.agentId || undefined);
    const [agents, setAgents] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<'status' | 'paymentStatus' | 'agentId' | null>(null);

    useEffect(() => {
        async function fetchAgents() {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/delivery/get-all-agents`, {
                    headers: {
                        contentType: "application/json",
                        adminKey: `Bearer-${process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY}`
                    }
                });
                const sellerSpecificDeliveryAgents = res.data.agents.filter((agent: any) => agent.sellers.includes(userId as string));
                setAgents(sellerSpecificDeliveryAgents || []);
            } catch (e) {
                setAgents([]);
            }
        }
        if(userId) {
            fetchAgents();
        }
    }, [session]);

    const handleUpdate = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const payload: any = { };
            if (pendingAction === 'status') payload.status = status;
            if (pendingAction === 'paymentStatus') payload.paymentStatus = paymentStatus;
            if (pendingAction === 'agentId') payload.agentId = agentId;
            await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URI}/order/update/${order._id}`, payload, {
                headers: {
                    contentType: "application/json",
                    adminKey: `Bearer-${process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY}`
                }
            });
            setSuccess(true);
        } catch (e: any) {
            setError(e?.response?.data?.message || 'Update failed');
        } finally {
            setLoading(false);
            setConfirmOpen(false);
            setTimeout(() => setSuccess(false), 2000);
        }
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
            <ArrowRightCircle />
            </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[500px] sm:w-[540px] overflow-y-scroll bg-white">
            <SheetHeader>
            <SheetTitle>Order Details</SheetTitle>
            </SheetHeader>
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
            <div className="mt-8">
              <h3 className="font-semibold mb-2 text-lg">Actions</h3>
              <div className="space-y-4">
              <div>
                  <label className="block text-xs font-medium mb-1">Assign Delivery Agent</label>
                  <Select value={agentId} onValueChange={val => { setAgentId(val); setPendingAction('agentId'); setConfirmOpen(true); }}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select agent" />
                    </SelectTrigger>
                    <SelectContent className='bg-white'>
                      {agents.map(agent => (
                        <SelectItem key={agent._id} value={agent._id}>{agent.username} ({agent.phoneNumber})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Change Status */}
                <div>
                  <label className="block text-xs font-medium mb-1">Change Order Status</label>
                  <Select value={status} onValueChange={val => { setStatus(val); setPendingAction('status'); setConfirmOpen(true); }}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className='bg-white'>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="preparing">Preparing</SelectItem>
                      <SelectItem value="ready_for_pickup">Ready for Pickup</SelectItem>
                      <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* Change Payment Status */}
                <div>
                  <label className="block text-xs font-medium mb-1">Change Payment Status</label>
                  <Select value={paymentStatus} onValueChange={val => { setPaymentStatus(val); setPendingAction('paymentStatus'); setConfirmOpen(true); }}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select payment status" />
                    </SelectTrigger>
                    <SelectContent className='bg-white'>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* Assign Delivery Agent */}
                
              </div>
              {/* Confirmation Dialog */}
              <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <DialogContent className='bg-white'>
                  <DialogHeader>
                    <DialogTitle>Confirm Update</DialogTitle>
                  </DialogHeader>
                  <div className="py-2 text-sm">Are you sure you want to update this order?</div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setConfirmOpen(false)}>Cancel</Button>
                    <Button onClick={handleUpdate} disabled={loading}>
                      {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null} Confirm
                    </Button>
                  </DialogFooter>
                  {success && <div className="flex items-center text-green-600 mt-2"><CheckCircle className="h-4 w-4 mr-1" /> Update successful!</div>}
                  {error && <div className="flex items-center text-red-600 mt-2"><XCircle className="h-4 w-4 mr-1" /> {error}</div>}
                </DialogContent>
              </Dialog>
            </div>
        </SheetContent>
        </Sheet>
    );
} 