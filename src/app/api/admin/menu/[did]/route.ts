import { getPrismaErrorResponse } from "@/app/api/utils";
import prisma from "@/app/prismaClient/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ did: string }> }
) {
    const { did } = await params;

    const { name, description, price, category, isVegan, spicyLevel } =
        await req.json();

    // Only the properties which are not null

    const data: any = {};
    if (name !== undefined) data.name = name;
    if (description !== undefined) data.description = description;
    if (price !== undefined) data.price = price;
    if (category !== undefined) data.category = category;
    if (isVegan !== undefined) data.isVegan = isVegan;
    if (spicyLevel !== undefined) data.spicyLevel = spicyLevel;

    try {
        const dish = await prisma.dish.update({
            where: { id: Number(did) },
            data: data,
        });

        return NextResponse.json({
            success: true,
            message: "Dish updated successfully",
            id: dish.id,
        });
    } catch (error) {
        const [errorResponse, status] = getPrismaErrorResponse(error);
        return NextResponse.json(errorResponse, status);
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ did: string }> }
) {
    const { did } = await params;

    try {
        await prisma.dish.delete({ where: { id: Number(did) } });
        return NextResponse.json({
            success: true,
            message: "Dish deleted successfully",
        });
    } catch (error) {
        const [errorResponse, status] = getPrismaErrorResponse(error);
        return NextResponse.json(errorResponse, status);
    }
}
