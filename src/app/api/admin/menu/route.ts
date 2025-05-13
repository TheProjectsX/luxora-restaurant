import prisma from "@/app/prismaClient/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getPrismaErrorResponse } from "@/app/api/utils";

export async function POST(req: NextRequest) {
    const { name, description, price, category, isVegan, spicyLevel } =
        await req.json();

    try {
        const dish = await prisma.dish.create({
            data: { name, description, price, category, isVegan, spicyLevel },
        });

        return NextResponse.json({
            success: true,
            message: "Dish created successfully",
            id: dish.id,
        });
    } catch (error) {
        const [errorResponse, status] = getPrismaErrorResponse(error);
        return NextResponse.json(errorResponse, status);
    }
}
