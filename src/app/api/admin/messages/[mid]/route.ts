import { getPrismaErrorResponse } from "@/app/api/utils";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/prismaClient/prisma";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ mid: string }> }
) {
    const { mid } = await params;

    try {
        await prisma.contactMessage.delete({ where: { id: Number(mid) } });
        return NextResponse.json({
            success: true,
            message: "Message deleted successfully",
        });
    } catch (error) {
        const [errorResponse, status] = getPrismaErrorResponse(error);
        return NextResponse.json(errorResponse, status);
    }
}
