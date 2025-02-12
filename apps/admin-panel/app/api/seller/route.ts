import connectDatabase from "@/backend/db";
import { addNewSeller, getAllSellers, updateSellerData, removeSeller } from "@/backend/services/seller.service";
import { NextRequest, NextResponse } from "next/server";

// POST: Add a new seller
export const POST = async (req: NextRequest) => {
    try {
        connectDatabase();
        const body = await req.json();
        const response = await addNewSeller(body);
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal server error" });
    }
};

// GET: Get all sellers
export const GET = async () => {
    try {
        connectDatabase();
        const response = await getAllSellers();
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal server error" });
    }
};

// PUT: Update seller by ID
export const PUT = async (req: NextRequest) => {
    try {
        connectDatabase();
        const body = await req.json();
        const sellerId = req.nextUrl.searchParams.get("sellerId");
        const response = await updateSellerData(sellerId as string, body);
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal server error" });
    }
};

// DELETE: Remove seller by ID
export const DELETE = async (req: NextRequest) => {
    try {
        connectDatabase();
        const sellerId = req.nextUrl.searchParams.get("sellerId");
        const response = await removeSeller(sellerId as string);
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal server error" });
    }
};
