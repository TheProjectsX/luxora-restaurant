import { NextRequest, NextResponse } from "next/server";
import { getPrismaErrorResponse } from "@/app/api/utils";
import prisma from "@/app/prismaClient/prisma";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ rid: string }> }
) {
    const { rid } = await params;

    try {
        const reservation = await prisma.reservation.findUnique({
            where: { id: parseInt(rid) },
        });

        return NextResponse.json({
            success: true,
            data: reservation,
        });
    } catch (error) {
        const [errorResponse, status] = getPrismaErrorResponse(error);
        return NextResponse.json(errorResponse, status);
    }
}
