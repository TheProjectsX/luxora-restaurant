import { getPrismaErrorResponse } from "@/app/api/utils";
import prisma from "@/app/prismaClient/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ rid: string }> }
) {
    try {
        const { rid } = await params;

        await prisma.reservation.update({
            where: { id: Number(rid) },
            data: { status: "confirmed" },
        });

        return NextResponse.json({
            success: true,
            message: "Reservation Confirmed successfully",
        });
    } catch (error) {
        const [errorResponse, status] = getPrismaErrorResponse(error);
        return NextResponse.json(errorResponse, status);
    }
}
