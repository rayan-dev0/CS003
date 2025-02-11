import connectDatabase from "@/backend/db";
import { addNewSeller, removeSeller } from "@/backend/services/seller.service";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        connectDatabase();
        const body = await req.json();
        const response = await addNewSeller(body);
        return NextResponse.json(response);  
    } catch (error) {
        return NextResponse.json({ error });
    }
}

export const DELETE = async (req: NextRequest) => {
    try {
        connectDatabase();
        const sellerId = req.nextUrl.searchParams.get("sellerId");
        console.log(sellerId);
        const response = await removeSeller(sellerId);
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ error });
    }
}