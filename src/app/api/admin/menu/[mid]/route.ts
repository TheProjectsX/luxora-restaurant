import { filterDefinedFields, getPrismaErrorResponse } from "@/app/api/utils";
import prisma from "@/app/prismaClient/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ mid: string }> }
) {
    const { mid } = await params;

    const body = await req.json();
    const data = filterDefinedFields(body);

    try {
        const dish = await prisma.dish.update({
            where: { id: Number(mid) },
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
    { params }: { params: Promise<{ mid: string }> }
) {
    const { mid } = await params;

    try {
        await prisma.dish.delete({ where: { id: Number(mid) } });
        return NextResponse.json({
            success: true,
            message: "Dish deleted successfully",
        });
    } catch (error) {
        const [errorResponse, status] = getPrismaErrorResponse(error);
        return NextResponse.json(errorResponse, status);
    }
}
