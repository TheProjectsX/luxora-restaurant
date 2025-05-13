import { getPrismaErrorResponse } from "@/app/api/utils";
import prisma from "@/app/prismaClient/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ gid: string }> }
) {
    const { gid } = await params;

    try {
        await prisma.galleryImage.delete({ where: { id: Number(gid) } });
        return NextResponse.json({
            success: true,
            message: "Gallery image deleted successfully",
        });
    } catch (error) {
        const [errorResponse, status] = getPrismaErrorResponse(error);
        return NextResponse.json(errorResponse, status);
    }
}
