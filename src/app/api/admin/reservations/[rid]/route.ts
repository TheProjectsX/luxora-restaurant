import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/prismaClient/prisma";
import { getPrismaErrorResponse, parseDate } from "@/app/api/utils";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ rid: string }> }
) {
    const { rid } = await params;

    try {
        await prisma.reservation.delete({ where: { id: Number(rid) } });
        return NextResponse.json({
            success: true,
            message: "Reservation deleted successfully",
        });
    } catch (error) {
        const [errorResponse, status] = getPrismaErrorResponse(error);
        return NextResponse.json(errorResponse, status);
    }
}
