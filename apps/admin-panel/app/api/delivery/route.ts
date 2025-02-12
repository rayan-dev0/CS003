import connectDatabase from "@/backend/db";
import { addNewDeliveryBoy, getAllDeliveryBoys, removeDeliveryBoy, updateDeliveryBoyData } from "@/backend/services/delivery.service";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        connectDatabase();
        const body = await req.json();
        const response = await addNewDeliveryBoy(body);
        return NextResponse.json(response);  
    } catch (error) {
        return NextResponse.json({ error });
    }
}

export const GET = async () => {
    try {
        connectDatabase();
        const response = await getAllDeliveryBoys();
        return NextResponse.json(response.sellers);
    } catch (error) {
        return NextResponse.json({ error });
    }
}

export const PUT = async (req: NextRequest) => {
    try {
        connectDatabase();
        const body = await req.json();
        const deliveryBoyId = req.nextUrl.searchParams.get("deliveryBoyId");
        const response = await updateDeliveryBoyData(deliveryBoyId as string, body);
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ error });
    }
}

export const DELETE = async (req: NextRequest) => {
    try {
        connectDatabase();
        const deliveryBoyId = req.nextUrl.searchParams.get("deliveryBoyId");
        const response = await removeDeliveryBoy(deliveryBoyId as string);
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ error });
    }
}